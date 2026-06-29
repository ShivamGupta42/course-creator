#!/usr/bin/env node
// Dogfood validator: checks the OKF learner/knowledge overlay contract and a
// subset of the module-recipe contract across every generated course bundle.
// Light by design (per references/learner-and-knowledge-okf.md): it asserts
// structure and link integrity, NOT pedagogy judgments like strengths/schedule.

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname));
const courses = readdirSync(ROOT, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

let totalFail = 0, totalWarn = 0;
const report = [];

function walk(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split('\n')) {
    const mm = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (mm) fm[mm[1]] = mm[2].trim();
  }
  return fm;
}

// relative markdown links to .md files (ignore http(s) and anchors)
function mdLinks(text) {
  const links = [];
  const re = /\]\(([^)]+?)\)/g;
  let m;
  while ((m = re.exec(text))) {
    let t = m[1].split('#')[0].trim();
    if (!t || /^https?:/.test(t) || !t.endsWith('.md')) continue;
    links.push(t);
  }
  return links;
}

const BANNED_VOICE = [
  /\bit turns out\b/i, /\bthat said\b/i, /\bhere's the thing\b/i,
  /\bmake no mistake\b/i, /\blet that sink in\b/i, /\bdeep dive\b/i,
  /\bgame-changer\b/i, /\bcircle back\b/i,
];
// em-dash used as a connector (space-emdash-space), which the voice rules ban
const EMDASH_CONNECTOR = / — |—/;

function check(course) {
  const dir = join(ROOT, course);
  const R = { course, fail: [], warn: [], stats: {} };

  // --- OKF: every file in learner/ and knowledge/ has type frontmatter ---
  const okfFiles = [...walk(join(dir, 'knowledge')), ...walk(join(dir, 'learner'))]
    .filter(f => f.endsWith('.md'));
  const courseMd = join(dir, 'course.md');
  if (existsSync(courseMd)) okfFiles.push(courseMd);

  const typeCounts = {};
  for (const f of okfFiles) {
    const text = readFileSync(f, 'utf8');
    const fm = frontmatter(text);
    const rel = relative(dir, f);
    if (!fm) { R.fail.push(`OKF: ${rel} has no YAML frontmatter`); continue; }
    if (!fm.type) { R.fail.push(`OKF: ${rel} frontmatter missing required \`type\``); continue; }
    typeCounts[fm.type] = (typeCounts[fm.type] || 0) + 1;
    // link integrity
    for (const link of mdLinks(text)) {
      const target = resolve(dirname(f), link);
      if (!existsSync(target)) R.fail.push(`OKF link broken in ${rel}: ${link}`);
    }
  }
  R.stats.types = typeCounts;

  // required OKF docs
  for (const [t, label] of [['Course', 'course.md'], ['Mission', 'learner/mission.md'], ['LearnerState', 'learner/state.md']]) {
    if (!typeCounts[t]) R.fail.push(`OKF: no document of type ${t} (${label})`);
  }
  const recordCount = walk(join(dir, 'learner', 'records')).filter(f => f.endsWith('.md')).length;
  R.stats.records = recordCount;
  if (recordCount < 1) R.warn.push('OKF: no learner/records/*.md session records');
  const conceptCount = walk(join(dir, 'knowledge')).filter(f => f.endsWith('.md') && !f.endsWith('index.md')).length;
  R.stats.concepts = conceptCount;
  if (conceptCount < 6) R.warn.push(`OKF: only ${conceptCount} concept docs (expected 8-12)`);

  // --- state.md references only concepts that exist ---
  const stateFile = join(dir, 'learner', 'state.md');
  if (existsSync(stateFile)) {
    const stext = readFileSync(stateFile, 'utf8');
    const refs = mdLinks(stext);
    if (refs.length === 0) R.warn.push('state.md has no concept links in its table');
    for (const link of refs) {
      const target = resolve(dirname(stateFile), link);
      if (!existsSync(target)) R.fail.push(`state.md references missing concept: ${link}`);
    }
  }

  // --- knowledge DAG has no trivial self-cycle ---
  for (const f of walk(join(dir, 'knowledge')).filter(f => f.endsWith('.md'))) {
    const text = readFileSync(f, 'utf8');
    const fm = frontmatter(text) || {};
    if (fm.prerequisites && fm.prerequisites.includes(relative(dir, f).split('/').pop())) {
      // crude: a concept listing itself as prerequisite
      R.warn.push(`knowledge/${relative(join(dir,'knowledge'), f)} may list itself as prerequisite`);
    }
  }

  // --- course.md module count (heuristic: count concept-linking list items) ---
  if (existsSync(courseMd)) {
    const ctext = readFileSync(courseMd, 'utf8');
    // count both list-item entries and Markdown table rows that link a concept
    const moduleLines = ctext.split('\n').filter(l =>
      (/^\s*(\d+\.|[-*])\s/.test(l) || /^\s*\|/.test(l)) && /\]\([^)]+\.md/.test(l));
    R.stats.mappedModules = moduleLines.length;
    if (moduleLines.length < 10) R.warn.push(`course.md maps only ${moduleLines.length} module lines with concept links`);
  }

  // --- sample modules (guide/content/*.html) ---
  const modules = walk(join(dir, 'guide', 'content')).filter(f => f.endsWith('.html'));
  R.stats.sampleModules = modules.length;
  if (modules.length < 2) R.warn.push(`only ${modules.length} sample HTML modules (asked for 2)`);

  const REQUIRED = [
    'id="main-heading"', 'Picture the idea', 'data-example', 'data-metaphor',
    'data-test', 'data-campus', 'data-boundary', 'Figure it out from scratch',
    'Explain It to a Friend', 'Build it yourself', 'data-build-project',
    'Module check', 'card-lead', 'card-points', 'data-practice',
  ];
  const anchors = { example: [], metaphor: [], test: [], campus: [], boundary: [] };
  for (const f of modules) {
    const html = readFileSync(f, 'utf8');
    const rel = relative(dir, f);
    for (const sub of REQUIRED) {
      if (!html.includes(sub)) R.fail.push(`module ${rel} missing required \`${sub}\``);
    }
    // quizzes
    const quizzes = (html.match(/<div class="quiz"/g) || []).length;
    const correct = (html.match(/data-correct="true"/g) || []).length;
    const explains = (html.match(/quiz-explain/g) || []).length;
    if (quizzes < 5 || quizzes > 7) R.fail.push(`module ${rel} has ${quizzes} quizzes (need 5-7)`);
    if (correct < quizzes) R.fail.push(`module ${rel}: ${correct} data-correct for ${quizzes} quizzes (need 1 each)`);
    if (explains < quizzes) R.fail.push(`module ${rel}: ${explains} quiz-explain for ${quizzes} quizzes`);
    // practice ladder
    for (const stage of ['worked', 'faded', 'independent', 'transfer']) {
      if (!html.includes(`data-practice="${stage}"`)) R.warn.push(`module ${rel} missing data-practice="${stage}"`);
    }
    // collect anchor prose for uniqueness
    for (const key of Object.keys(anchors)) {
      const m = html.match(new RegExp(`data-${key}[^>]*>([\\s\\S]*?)</p>`, 'i'));
      if (m) anchors[key].push(m[1].replace(/<[^>]+>/g, '').trim().toLowerCase());
    }
    // writing voice — scoped to prose: strip tables (nil-cell "—" markers) and
    // <code> (math minus signs, ranges) first, mirroring the contract's voice gate.
    const textOnly = html
      .replace(/<table[\s\S]*?<\/table>/gi, ' ')
      .replace(/<code[\s\S]*?<\/code>/gi, ' ')
      .replace(/<[^>]+>/g, ' ');
    for (const re of BANNED_VOICE) if (re.test(textOnly)) R.warn.push(`module ${rel} voice: banned phrase ${re}`);
    if (EMDASH_CONNECTOR.test(textOnly)) R.warn.push(`module ${rel} voice: em-dash connector present`);
  }
  // uniqueness across the two modules
  for (const key of Object.keys(anchors)) {
    const vals = anchors[key].filter(Boolean);
    if (vals.length >= 2 && new Set(vals).size < vals.length)
      R.fail.push(`modules share identical data-${key} (title-swap boilerplate)`);
  }

  return R;
}

for (const c of courses) {
  if (!statSync(join(ROOT, c)).isDirectory()) continue;
  const R = check(c);
  totalFail += R.fail.length;
  totalWarn += R.warn.length;
  report.push(R);
}

console.log('\n=== DOGFOOD VALIDATION REPORT ===\n');
for (const R of report) {
  const status = R.fail.length === 0 ? '✅ PASS' : '❌ FAIL';
  console.log(`${status}  ${R.course}`);
  console.log(`   stats: ${JSON.stringify(R.stats)}`);
  for (const f of R.fail) console.log(`   ❌ ${f}`);
  for (const w of R.warn) console.log(`   ⚠️  ${w}`);
  console.log('');
}
console.log(`TOTAL: ${totalFail} failures, ${totalWarn} warnings across ${report.length} courses\n`);
process.exit(totalFail > 0 ? 1 : 0);
