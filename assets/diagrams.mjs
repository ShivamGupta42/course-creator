// Deterministic SVG diagram engine for course lesson diagrams.
// Layout is collision-free by construction: titles, captions, boxes, and
// connector labels occupy fixed non-overlapping bands. Per-module specs supply
// only labels and values, never raw coordinates. Run: node tools/diagrams.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { SPECS } from "./diagram-specs.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "assets", "diagrams");
mkdirSync(outDir, { recursive: true });

const W = 480;
const H = 300;
const FONT = `font-family="Inter,ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif"`;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Greedy word-wrap into <=maxChars lines (max `maxLines`, last line gets an ellipsis if clipped).
function wrap(text, maxChars, maxLines = 3) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length <= maxChars) cur = (cur + " " + w).trim();
    else { if (cur) lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) { lines.length = maxLines; lines[maxLines - 1] = lines[maxLines - 1].replace(/.{1}$/, "…"); }
  return lines;
}

function text(x, y, s, { size = 13, weight = 400, fill = "#1a2b4a", anchor = "middle" } = {}) {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" fill="${fill}" ${FONT}>${esc(s)}</text>`;
}
// Multi-line centered text block centered vertically on cy.
function block(cx, cy, lines, opts = {}) {
  const lh = opts.lh || (opts.size || 13) + 4;
  const start = cy - ((lines.length - 1) * lh) / 2;
  return lines.map((ln, i) => text(cx, start + i * lh + (opts.size || 13) / 3, ln, opts)).join("");
}
function box(x, y, w, h, { fill = "#eef3fb", stroke = "#3b6fd6", rx = 12 } = {}) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="1.6"/>`;
}
function arrow(x1, x2, y, label) {
  const head = `<path d="M${x2 - 8} ${y - 5} L${x2} ${y} L${x2 - 8} ${y + 5} Z" fill="#33415c"/>`;
  const line = `<line x1="${x1}" y1="${y}" x2="${x2 - 6}" y2="${y}" stroke="#33415c" stroke-width="1.6"/>`;
  // Label sits ABOVE the arrow, never on it.
  const lab = label ? text((x1 + x2) / 2, y - 9, label, { size: 11, fill: "#5a6677", weight: 600 }) : "";
  return line + head + lab;
}

const PALETTE = [
  { fill: "#eaf1fd", stroke: "#3b6fd6", ink: "#16407f" },
  { fill: "#fff1e6", stroke: "#e07b2e", ink: "#9a4a06" },
  { fill: "#e9f7ee", stroke: "#2f9e54", ink: "#176034" },
  { fill: "#f3ecff", stroke: "#7b52d6", ink: "#4a2a9a" },
  { fill: "#fdeef0", stroke: "#cf3b52", ink: "#8f1f31" },
];

function frame(title, body, caption) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img">
<rect x="0" y="0" width="${W}" height="${H}" rx="16" fill="#ffffff"/>
${block(W / 2, 30, wrap(title, 46, 2), { size: 16, weight: 700, fill: "#16223c" })}
${body}
${caption ? block(W / 2, 282, wrap(caption, 64, 2), { size: 11.5, fill: "#5b6677" }) : ""}
</svg>\n`;
}

// ---- Archetypes ---------------------------------------------------------
const archetypes = {
  // Boxes left->right with labeled arrows. spec.boxes:[{label,sub}], spec.arrows:[label]
  pipeline(spec) {
    const items = spec.boxes;
    const n = items.length;
    const gap = 24;
    const bw = Math.min(118, (W - 36 - gap * (n - 1)) / n);
    const totalW = bw * n + gap * (n - 1);
    let x = (W - totalW) / 2;
    const y = 112, bh = 84, cy = y + bh / 2;
    const maxChars = Math.max(7, Math.floor(bw / 8)); // fit label width to the box
    let out = "";
    items.forEach((it, i) => {
      const p = PALETTE[i % PALETTE.length];
      out += box(x, y, bw, bh, { fill: p.fill, stroke: p.stroke });
      out += block(x + bw / 2, y + 30, wrap(it.label, maxChars, 2), { size: 12.5, weight: 700, fill: p.ink, lh: 15 });
      if (it.sub) out += block(x + bw / 2, y + bh - 20, wrap(it.sub, maxChars + 2, 2), { size: 9.5, fill: "#5a6677", lh: 11 });
      // No arrow label: the gap between boxes is too small to hold text without clipping.
      if (i < n - 1) out += arrow(x + bw, x + bw + gap, cy, "");
      x += bw + gap;
    });
    return frame(spec.title, out, spec.caption);
  },

  // Two circles + a distance line + an off-center received point.
  spheres(spec) {
    const lY = 150, lX = 150, rX = 330, r = 58;
    let out = "";
    out += `<circle cx="${lX}" cy="${lY}" r="${r}" fill="#eaf1fd" stroke="#3b6fd6" stroke-width="1.6" stroke-dasharray="4 3"/>`;
    out += `<circle cx="${rX}" cy="${lY}" r="${r}" fill="#fdeef0" stroke="#cf3b52" stroke-width="1.6" stroke-dasharray="4 3"/>`;
    // distance line between centers; label ABOVE it
    out += `<line x1="${lX}" y1="${lY}" x2="${rX}" y2="${lY}" stroke="#445" stroke-width="1.4"/>`;
    out += `<circle cx="${lX}" cy="${lY}" r="5" fill="#16407f"/><circle cx="${rX}" cy="${lY}" r="5" fill="#8f1f31"/>`;
    out += text((lX + rX) / 2, lY - 12, spec.distanceLabel || "", { size: 12, weight: 700, fill: "#33415c" });
    // codeword labels ABOVE each circle
    out += text(lX, lY - r - 8, spec.left, { size: 12.5, weight: 700, fill: "#16407f" });
    out += text(rX, lY - r - 8, spec.right, { size: 12.5, weight: 700, fill: "#8f1f31" });
    // received point inside left circle, label BELOW it
    if (spec.point) {
      const px = lX + 18, py = lY + 26;
      out += `<circle cx="${px}" cy="${py}" r="5" fill="#6f9be0"/>`;
      out += text(px, py + 16, spec.point, { size: 11, fill: "#445" });
    }
    if (spec.note) out += text(W / 2, lY + r + 30, spec.note, { size: 11.5, weight: 600, fill: "#16407f" });
    return frame(spec.title, out, spec.caption);
  },

  // Distribution bars -> value box, with two side notes below.
  barsToValue(spec) {
    let out = "";
    const bx = 40, by = 70, bw = 200, bh = 120;
    out += box(bx, by, bw, bh, { fill: "#f4f7fc", stroke: "#3b6fd6" });
    out += text(bx + bw / 2, by + 22, spec.barsTitle || "distribution p(x)", { size: 12.5, weight: 700, fill: "#16407f" });
    const bars = spec.bars || [0.5, 0.8, 1, 0.4];
    const baseY = by + bh - 16, maxH = 60, slot = (bw - 40) / bars.length;
    bars.forEach((h, i) => {
      const barH = Math.max(6, h * maxH), x = bx + 20 + i * slot + slot * 0.15, w = slot * 0.7;
      out += `<rect x="${x}" y="${baseY - barH}" width="${w}" height="${barH}" rx="2" fill="#3b6fd6"/>`;
    });
    // arrow to value box (no label: the short gap can't hold text without clipping)
    out += arrow(bx + bw, bx + bw + 24, by + bh / 2, "");
    const vx = bx + bw + 24, vy = 84, vw = 176, vh = 92;
    out += box(vx, vy, vw, vh, { fill: "#fff1e6", stroke: "#e07b2e" });
    out += block(vx + vw / 2, vy + 34, wrap(spec.value, 20, 2), { size: 13.5, weight: 700, fill: "#9a4a06" });
    if (spec.valueSub) out += block(vx + vw / 2, vy + 68, wrap(spec.valueSub, 24, 1), { size: 10.5, fill: "#7a5a30" });
    // notes band (below boxes, above caption)
    (spec.notes || []).slice(0, 2).forEach((nt, i) => {
      out += text(W / 2, 214 + i * 20, nt, { size: 11.5, fill: "#445" });
    });
    return frame(spec.title, out, spec.caption);
  },

  // Two overlapping circles with three region labels.
  venn(spec) {
    const cy = 150, lX = 200, rX = 280, r = 70;
    let out = "";
    out += `<circle cx="${lX}" cy="${cy}" r="${r}" fill="#3b6fd6" fill-opacity="0.16" stroke="#3b6fd6" stroke-width="1.6"/>`;
    out += `<circle cx="${rX}" cy="${cy}" r="${r}" fill="#e07b2e" fill-opacity="0.16" stroke="#e07b2e" stroke-width="1.6"/>`;
    out += text(lX - 34, cy + 4, spec.leftOnly, { size: 12, weight: 700, fill: "#16407f" });
    out += text(rX + 34, cy + 4, spec.rightOnly, { size: 12, weight: 700, fill: "#9a4a06" });
    out += text((lX + rX) / 2, cy - r - 10, spec.left || "", { size: 11.5, weight: 600, fill: "#16407f", anchor: "end" });
    out += block((lX + rX) / 2, cy + 4, wrap(spec.overlap, 10, 2), { size: 11.5, weight: 700, fill: "#176034" });
    out += text((lX + rX) / 2, cy + r + 18, spec.note || "", { size: 11.5, fill: "#445" });
    return frame(spec.title, out, spec.caption);
  },

  // Axes with a curve and labeled points.
  curve(spec) {
    const ox = 70, oy = 210, ax = 410, ay = 70;
    let out = "";
    out += `<line x1="${ox}" y1="${oy}" x2="${ax}" y2="${oy}" stroke="#445" stroke-width="1.4"/>`;
    out += `<line x1="${ox}" y1="${oy}" x2="${ox}" y2="${ay}" stroke="#445" stroke-width="1.4"/>`;
    out += text((ox + ax) / 2, oy + 24, spec.xlabel || "", { size: 11.5, fill: "#445" });
    out += `<text x="${ox - 14}" y="${(oy + ay) / 2}" text-anchor="middle" font-size="11.5" fill="#445" ${FONT} transform="rotate(-90 ${ox - 14} ${(oy + ay) / 2})">${esc(spec.ylabel || "")}</text>`;
    const path = spec.shape === "line"
      ? `M${ox} ${oy} L${ax} ${ay}`
      : spec.shape === "gauss"
        ? `M${ox} ${oy} Q${(ox + ax) / 2} ${ay - 30} ${ax} ${oy}`
        : `M${ox} ${oy} Q${ox + 70} ${ay} ${ax} ${ay + 6}`; // concave
    out += `<path d="${path}" fill="none" stroke="#3b6fd6" stroke-width="2"/>`;
    (spec.points || []).forEach((p) => {
      const px = ox + p.x * (ax - ox), py = oy - p.y * (oy - ay);
      out += `<circle cx="${px}" cy="${py}" r="4" fill="#cf3b52"/>`;
      out += text(px, py - 10, p.label, { size: 11, weight: 600, fill: "#8f1f31" });
    });
    return frame(spec.title, out, spec.caption);
  },

  // NxM payoff/comparison grid (game theory, decision tables).
  matrix(spec) {
    const rows = spec.rows, cols = spec.cols;
    const gx = 150, gy = 96, cw = Math.min(120, (W - gx - 24) / cols.length), ch = 44;
    let out = "";
    out += text((gx + cols.length * cw / 2), 76, spec.colTitle || "", { size: 11, weight: 600, fill: "#5a6677" });
    cols.forEach((c, j) => out += block(gx + j * cw + cw / 2, gy - 8, wrap(c, 14, 2), { size: 11, weight: 700, fill: "#16407f", lh: 12 }));
    rows.forEach((r, i) => {
      out += block(gx - 12, gy + 16 + i * ch + ch / 2, wrap(r, 16, 2), { size: 11, weight: 700, fill: "#9a4a06", anchor: "end", lh: 12 });
      cols.forEach((c, j) => {
        const x = gx + j * cw, y = gy + 16 + i * ch;
        const p = PALETTE[(i + j) % PALETTE.length];
        out += box(x, y, cw - 6, ch - 6, { fill: p.fill, stroke: p.stroke, rx: 6 });
        out += block(x + (cw - 6) / 2, y + (ch - 6) / 2 + 4, wrap(String((spec.cells[i] || [])[j] ?? ""), 12, 2), { size: 11, weight: 600, fill: p.ink, lh: 12 });
      });
    });
    if (spec.rowTitle) out += `<text x="36" y="${gy + 16 + rows.length * ch / 2}" text-anchor="middle" font-size="11" font-weight="600" fill="#5a6677" ${FONT} transform="rotate(-90 36 ${gy + 16 + rows.length * ch / 2})">${esc(spec.rowTitle)}</text>`;
    return frame(spec.title, out, spec.caption);
  },

  // Circular process: nodes on a ring with arrows between consecutive nodes.
  cycle(spec) {
    const nodes = spec.nodes, n = nodes.length, cx = 240, cy = 162, R = 78, r = 30;
    let out = "";
    const pt = (i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / n; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; };
    for (let i = 0; i < n; i++) {
      const [x1, y1] = pt(i), [x2, y2] = pt((i + 1) % n);
      out += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#94a0b3" stroke-width="1.4"/>`;
    }
    nodes.forEach((nd, i) => {
      const [x, y] = pt(i), p = PALETTE[i % PALETTE.length];
      out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${p.fill}" stroke="${p.stroke}" stroke-width="1.6"/>`;
      out += block(x, y + 4, wrap(nd.label, 9, 2), { size: 10.5, weight: 700, fill: p.ink, lh: 11 });
    });
    return frame(spec.title, out, spec.caption);
  },

  // Central structure with labeled callouts around it (anatomy, biology parts).
  parts(spec) {
    const cx = 240, cy = 158;
    let out = "";
    out += box(cx - 70, cy - 34, 140, 68, { fill: "#eef3fb", stroke: "#33415c" });
    out += block(cx, cy + 4, wrap(spec.center, 16, 2), { size: 12.5, weight: 700, fill: "#16223c", lh: 14 });
    const slots = [[cx - 150, 110], [cx + 150, 110], [cx - 150, 206], [cx + 150, 206], [cx, 92], [cx, 232]];
    (spec.parts || []).slice(0, 6).forEach((pt2, i) => {
      const [lx, ly] = slots[i], p = PALETTE[i % PALETTE.length];
      const anchorX = lx < cx ? cx - 70 : lx > cx ? cx + 70 : cx;
      const anchorY = ly < cy ? cy - 34 : ly > cy ? cy + 34 : cy;
      out += `<line x1="${lx}" y1="${ly}" x2="${anchorX}" y2="${anchorY}" stroke="#b9c2d0" stroke-width="1.2"/>`;
      out += box(lx - 58, ly - 16, 116, 32, { fill: p.fill, stroke: p.stroke, rx: 6 });
      out += block(lx, ly + 4, wrap(pt2, 16, 2), { size: 10.5, weight: 600, fill: p.ink, lh: 11 });
    });
    return frame(spec.title, out, spec.caption);
  },

  // System topology: tiered nodes with labeled connectors (client/LB/service/DB/cache/queue).
  // spec.nodes:[{id,label,col,row?}], spec.edges:[{from,to,label?}]
  topology(spec) {
    const nodes = spec.nodes;
    const cols = Math.max(...nodes.map((n) => n.col)) + 1;
    const colX = (c) => 60 + (c * (W - 120)) / Math.max(1, cols - 1);
    const perCol = {};
    nodes.forEach((n) => { (perCol[n.col] = perCol[n.col] || []).push(n); });
    const pos = {};
    for (const c of Object.keys(perCol)) {
      const list = perCol[c];
      const span = list.length > 1 ? Math.min(120, 170 / (list.length - 1)) : 0;
      const y0 = 165 - (span * (list.length - 1)) / 2;
      list.forEach((n, i) => {
        pos[n.id] = { x: colX(+c), y: list.length === 1 ? 165 : y0 + i * span };
      });
    }
    const bw = Math.min(96, (W - 120) / cols - 8), bh = 46;
    let out = "";
    for (const e of spec.edges || []) {
      const a = pos[e.from], b = pos[e.to];
      if (!a || !b) continue;
      out += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="#94a0b3" stroke-width="1.4"/>`;
      if (e.label) out += text((a.x + b.x) / 2, (a.y + b.y) / 2 - 4, e.label, { size: 9.5, fill: "#5a6677", weight: 600 });
    }
    nodes.forEach((n, i) => {
      const p = pos[n.id], pal = PALETTE[i % PALETTE.length];
      out += box(p.x - bw / 2, p.y - bh / 2, bw, bh, { fill: pal.fill, stroke: pal.stroke, rx: 8 });
      out += block(p.x, p.y + 4, wrap(n.label, 12, 2), { size: 10.5, weight: 700, fill: pal.ink, lh: 11 });
    });
    return frame(spec.title, out, spec.caption);
  },

  // Sequence/interaction: actor lifelines with ordered messages.
  // spec.actors:[label], spec.messages:[{from,to,label}]
  sequence(spec) {
    const actors = spec.actors, n = actors.length;
    const ax = (i) => 70 + (i * (W - 140)) / Math.max(1, n - 1);
    const top = 92, bottom = 250;
    let out = "";
    actors.forEach((a, i) => {
      out += box(ax(i) - 44, 64, 88, 28, { fill: PALETTE[i % PALETTE.length].fill, stroke: PALETTE[i % PALETTE.length].stroke, rx: 6 });
      out += block(ax(i), 82, wrap(a, 13, 1), { size: 10.5, weight: 700, fill: PALETTE[i % PALETTE.length].ink });
      out += `<line x1="${ax(i)}" y1="${top}" x2="${ax(i)}" y2="${bottom}" stroke="#c7cedb" stroke-width="1.2" stroke-dasharray="3 3"/>`;
    });
    const msgs = (spec.messages || []).slice(0, 6);
    const dy = (bottom - top - 16) / Math.max(1, msgs.length);
    msgs.forEach((m, i) => {
      const y = top + 16 + i * dy, x1 = ax(m.from), x2 = ax(m.to), dir = x2 >= x1 ? 1 : -1;
      out += `<line x1="${x1}" y1="${y}" x2="${x2 - dir * 7}" y2="${y}" stroke="#33415c" stroke-width="1.4"/>`;
      out += `<path d="M${x2 - dir * 7} ${y - 4} L${x2} ${y} L${x2 - dir * 7} ${y + 4} Z" fill="#33415c"/>`;
      out += text((x1 + x2) / 2, y - 6, m.label, { size: 9.5, fill: "#33415c", weight: 600 });
    });
    return frame(spec.title, out, spec.caption);
  },

  // Rubric scorecard: rows with a filled rating bar (before/after, delivery rubric).
  // spec.rows:[{label, score, max}]
  scorecard(spec) {
    const rows = spec.rows.slice(0, 6);
    let out = "";
    const x0 = 60, w = 220, h = 18, top = 80, gap = 28;
    rows.forEach((r, i) => {
      const y = top + i * gap;
      out += text(x0 - 8, y + h - 4, r.label, { size: 11, weight: 600, fill: "#33415c", anchor: "end" });
      out += box(x0, y, w, h, { fill: "#f1f4f9", stroke: "#c7cedb", rx: 4 });
      const frac = Math.max(0, Math.min(1, (r.score || 0) / (r.max || 5)));
      const pal = PALETTE[i % PALETTE.length];
      out += `<rect x="${x0}" y="${y}" width="${(w * frac).toFixed(1)}" height="${h}" rx="4" fill="${pal.stroke}"/>`;
      out += text(x0 + w + 24, y + h - 4, `${r.score}/${r.max || 5}`, { size: 10.5, fill: "#5a6677", weight: 600 });
    });
    return frame(spec.title, out, spec.caption);
  },

  // A total bar split into labeled segments.
  stack(spec) {
    const x0 = 50, y = 130, h = 54, totalW = W - 100;
    let out = "";
    let x = x0;
    const segs = spec.segments;
    segs.forEach((s, i) => {
      const w = s.frac * totalW;
      const p = PALETTE[i % PALETTE.length];
      out += box(x, y, w, h, { fill: p.fill, stroke: p.stroke, rx: 6 });
      out += block(x + w / 2, y + h / 2 + 4, wrap(s.label, Math.max(6, Math.floor(w / 8)), 2), { size: 11.5, weight: 700, fill: p.ink });
      x += w;
    });
    // brace label under whole bar
    out += `<line x1="${x0}" y1="${y + h + 12}" x2="${x0 + totalW}" y2="${y + h + 12}" stroke="#889" stroke-width="1"/>`;
    out += text(W / 2, y + h + 30, spec.totalLabel || "", { size: 12, weight: 700, fill: "#33415c" });
    return frame(spec.title, out, spec.caption);
  },
};

// A module may need more than one diagram. The primary spec renders to
// <id>.svg; each entry in spec.also (concept-driven, e.g. a second mechanism)
// renders to <id>-2.svg, <id>-3.svg, ... The lesson embeds extras inline where
// that concept appears.
function render(id, spec) {
  const fn = archetypes[spec.archetype];
  if (!fn) throw new Error(`Unknown archetype "${spec.archetype}" for ${id}`);
  return fn(spec);
}

let built = 0;
for (const [id, spec] of Object.entries(SPECS)) {
  writeFileSync(join(outDir, `${id}.svg`), render(id, spec));
  built++;
  (spec.also || []).forEach((extra, i) => {
    writeFileSync(join(outDir, `${id}-${i + 2}.svg`), render(`${id}-${i + 2}`, extra));
    built++;
  });
}

// Course-level overview shown on the home page (assets/course-visual-models.svg).
// SET THIS PER COURSE to the course's own title and three track names. Leaving
// it at another course's labels is a visible mismatch on the home page. Labels
// are kept short so they fit; the engine wraps anything long.
const COURSE_VISUAL = {
  archetype: "pipeline", title: "<Course Title> in three tracks",
  boxes: [
    { label: "<Track 1 title>" },
    { label: "<Track 2 title>" },
    { label: "<Track 3 title>" },
  ],
  caption: "Three tracks: foundations, a core toolkit, then projects and depth.",
};
writeFileSync(join(here, "..", "assets", "course-visual-models.svg"), render("course-visual-models", COURSE_VISUAL));
built++;
console.log(`Built ${built} diagrams (incl. course overview).`);
