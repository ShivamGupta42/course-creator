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

function frontmatterPathLinks(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return [];
  const links = [];
  const re = /(?:^|[\s,\[:\-])((?:\.{1,2}\/)[^\s,\]\)]+?\.md)(?=$|[\s,\]\)])/gm;
  let hit;
  while ((hit = re.exec(m[1]))) links.push(hit[1]);
  return links;
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

function okfLinks(text) {
  return [...mdLinks(text), ...frontmatterPathLinks(text)];
}

function readMaybe(file) {
  return existsSync(file) ? readFileSync(file, 'utf8') : '';
}

function sectionBlock(text, name) {
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (new RegExp(`^${name}:\\s*$`).test(lines[i].trim())) {
      const out = [];
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].trim() && /^\S/.test(lines[j])) break;
        out.push(lines[j]);
      }
      return out.join('\n');
    }
  }
  return '';
}

function scalar(text, key) {
  const m = text.match(new RegExp(`^\\s*${key}:\\s*(.+?)\\s*$`, 'm'));
  return m ? cleanYamlValue(m[1]) : '';
}

function cleanYamlValue(value) {
  return String(value || '')
    .trim()
    .replace(/^['"]|['"]$/g, '');
}

function yamlList(value) {
  const m = String(value || '').match(/^\[(.*)\]$/);
  if (!m) return value ? [cleanYamlValue(value)] : [];
  return m[1].split(',').map(v => cleanYamlValue(v)).filter(Boolean);
}

function parseItems(text) {
  const items = [];
  let cur = null;
  for (const line of text.split('\n')) {
    const start = line.match(/^\s*-\s+id:\s*(.+?)\s*$/);
    if (start) {
      cur = { id: cleanYamlValue(start[1]) };
      items.push(cur);
      continue;
    }
    const kv = line.match(/^\s{2,}([A-Za-z0-9_]+):\s*(.*?)\s*$/);
    if (cur && kv) cur[kv[1]] = cleanYamlValue(kv[2]);
  }
  return items;
}

function isEnabled(profile, section) {
  return /^\s+enabled:\s*true\b/m.test(sectionBlock(profile, section));
}

function parseSplit(value) {
  return yamlList(value).map(v => Number(v)).filter(n => Number.isFinite(n));
}

function titleLooksLikeQuestion(title) {
  return /\?/.test(title) || /^(how|should|when|why|what|which|can|is|do|does)\b/i.test(title);
}

const FILLER = /\b(learn more|good resource|useful resource|high quality|great overview|relevant resource)\b/i;
function genericFiller(value) {
  const v = String(value || '').trim();
  return v.length < 20 || FILLER.test(v);
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
  const profileFile = join(dir, 'PROFILE.md');
  const profile = readMaybe(profileFile);

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
    // link integrity: Markdown body links plus OKF frontmatter paths such as
    // prerequisites, covers, and profile.
    for (const link of okfLinks(text)) {
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
    const self = relative(dir, f).split('/').pop();
    if (frontmatterPathLinks(text).some(link => link.endsWith(`/${self}`) || link === self)) {
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

  // --- optional problem-first fixture checks (cheap structure only) ---
  const problemBlock = sectionBlock(profile, 'problem_first');
  if (isEnabled(profile, 'problem_first')) {
    const ladderFile = join(dir, 'PROBLEM_LADDER.md');
    const ladder = readMaybe(ladderFile);
    const items = parseItems(ladder);
    R.stats.problemFirstProblems = items.length;

    const courseMode = scalar(profile, 'course_mode');
    if (!['problem_first', 'hybrid'].includes(courseMode)) {
      R.fail.push('problem_first: course_mode must be problem_first or hybrid');
    }
    if (!existsSync(ladderFile)) R.fail.push('problem_first: PROBLEM_LADDER.md missing');

    const count = Number(scalar(problemBlock, 'problem_count'));
    const split = parseSplit(scalar(problemBlock, 'track_split'));
    if (!Number.isFinite(count) || count < 1) R.fail.push('problem_first: problem_count missing or invalid');
    else if (items.length !== count) R.fail.push(`problem_first: ${items.length} problems, profile expects ${count}`);
    if (split.length === 0) R.fail.push('problem_first: track_split missing');
    else if (split.reduce((a, b) => a + b, 0) !== items.length) R.fail.push(`problem_first: track_split ${split.join('/')} does not sum to ${items.length}`);
    else {
      const trackCounts = [];
      let currentTrack = null;
      for (const item of items) {
        if (item.track !== currentTrack) {
          currentTrack = item.track;
          trackCounts.push(0);
        }
        trackCounts[trackCounts.length - 1] += 1;
      }
      if (trackCounts.join('/') !== split.join('/')) R.fail.push(`problem_first: track counts ${trackCounts.join('/')} do not match profile ${split.join('/')}`);
    }

    for (const key of ['real_goal', 'current_level', 'known_terms', 'math_comfort', 'domain_contexts', 'depth', 'time_budget', 'safety_boundaries']) {
      if (!new RegExp(`^\\s{4}${key}:`, 'm').test(problemBlock)) R.fail.push(`problem_first diagnostic missing ${key}`);
    }

    const required = ['title', 'track', 'difficulty', 'learner_need', 'starting_intuition', 'prerequisite_check', 'hidden_concepts', 'expert_terms_introduced', 'artifact', 'safety_level'];
    const difficultyRank = { easy: 1, working: 2, hard: 3, capstone: 4 };
    let lastRank = 0;
    const needs = [], intuitions = [];
    items.forEach((item, idx) => {
      for (const key of required) if (!item[key]) R.fail.push(`problem_first ${item.id}: missing ${key}`);
      if (item.title && !titleLooksLikeQuestion(item.title)) R.fail.push(`problem_first ${item.id}: title is not question-shaped`);
      if (!yamlList(item.hidden_concepts).length) R.fail.push(`problem_first ${item.id}: hidden_concepts empty`);
      if (!yamlList(item.expert_terms_introduced).length) R.fail.push(`problem_first ${item.id}: expert_terms_introduced empty`);
      const rank = difficultyRank[item.difficulty] || 0;
      if (!rank) R.fail.push(`problem_first ${item.id}: invalid difficulty ${item.difficulty || '(missing)'}`);
      if (rank && rank < lastRank) R.fail.push(`problem_first ${item.id}: difficulty goes backward`);
      lastRank = Math.max(lastRank, rank);
      if (idx > 0 && (!item.extends_from || !item.changed_assumption)) R.fail.push(`problem_first ${item.id}: missing extends_from or changed_assumption`);
      if (item.safety_level && item.safety_level !== 'normal' && !item.safe_redirect) R.fail.push(`problem_first ${item.id}: unsafe item missing safe_redirect`);
      if (item.learner_need) needs.push(item.learner_need.toLowerCase());
      if (item.starting_intuition) intuitions.push(item.starting_intuition.toLowerCase());
    });
    if (new Set(needs).size < needs.length) R.fail.push('problem_first: duplicate learner_need');
    if (new Set(intuitions).size < intuitions.length) R.fail.push('problem_first: duplicate starting_intuition');
  }

  // --- optional resource-library fixture checks (cheap structure only) ---
  const resourceBlock = sectionBlock(profile, 'resource_library');
  if (isEnabled(profile, 'resource_library')) {
    const resourceFile = join(dir, 'RESOURCE_LIBRARY.md');
    const resources = parseItems(readMaybe(resourceFile));
    R.stats.resources = resources.length;
    if (!existsSync(resourceFile)) R.fail.push('resource_library: RESOURCE_LIBRARY.md missing');
    const maxItems = Number(scalar(resourceBlock, 'max_items'));
    if (!Number.isFinite(maxItems) || maxItems < 1) R.fail.push('resource_library: max_items missing or invalid');
    else if (resources.length > maxItems) R.fail.push(`resource_library: ${resources.length} resources exceeds max_items ${maxItems}`);

    const required = ['title', 'type', 'provider', 'url', 'level', 'cost', 'time', 'modules', 'concepts', 'use_when', 'why_this'];
    resources.forEach((item) => {
      for (const key of required) if (!item[key]) R.fail.push(`resource_library ${item.id}: missing ${key}`);
      if (!item.creator && !item.institution) R.fail.push(`resource_library ${item.id}: missing creator/institution`);
      if (item.url && !/^https:\/\//.test(item.url)) R.fail.push(`resource_library ${item.id}: URL is not https`);
      if (item.type === 'youtube' && item.url && !/^https:\/\/(www\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\//.test(item.url)) {
        R.fail.push(`resource_library ${item.id}: youtube item has non-YouTube URL`);
      }
      if (!yamlList(item.modules).length) R.fail.push(`resource_library ${item.id}: modules empty`);
      if (!yamlList(item.concepts).length) R.fail.push(`resource_library ${item.id}: concepts empty`);
      if (genericFiller(item.use_when)) R.fail.push(`resource_library ${item.id}: use_when is generic filler`);
      if (genericFiller(item.why_this)) R.fail.push(`resource_library ${item.id}: why_this is generic filler`);
    });
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
