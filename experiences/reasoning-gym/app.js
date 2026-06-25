(function () {
  "use strict";

  var STORAGE_KEY = "reasoning_gym_v1";
  var courses = window.REASONING_GYM_COURSES || [];
  var state = {
    courseId: courses[0] ? courses[0].id : "",
    moduleId: courses[0] && courses[0].modules[0] ? courses[0].modules[0].id : "",
    timerRunning: false,
    timerStartedAt: 0,
    timerSeconds: 0,
    records: {}
  };
  var timerHandle = null;

  var els = {
    courseSelect: byId("courseSelect"),
    moduleSelect: byId("moduleSelect"),
    trackLabel: byId("trackLabel"),
    moduleTitle: byId("moduleTitle"),
    moduleSummary: byId("moduleSummary"),
    supportBadge: byId("supportBadge"),
    conceptSvg: byId("conceptSvg"),
    conceptList: byId("conceptList"),
    confidence: byId("confidence"),
    confidenceValue: byId("confidenceValue"),
    goal: byId("goal"),
    primitives: byId("primitives"),
    representation: byId("representation"),
    tinyCase: byId("tinyCase"),
    boundary: byId("boundary"),
    transfer: byId("transfer"),
    repair: byId("repair"),
    benchmarkResult: byId("benchmarkResult"),
    primitiveHint: byId("primitiveHint"),
    representationHint: byId("representationHint"),
    tinyCaseHint: byId("tinyCaseHint"),
    boundaryHint: byId("boundaryHint"),
    transferHint: byId("transferHint"),
    externalHint: byId("externalHint"),
    form: byId("diagnosticForm"),
    scoreRing: byId("scoreRing"),
    scoreValue: byId("scoreValue"),
    scoreSummary: byId("scoreSummary"),
    breakdown: byId("breakdown"),
    weakLinks: byId("weakLinks"),
    nextReview: byId("nextReview"),
    benchmarks: byId("benchmarks"),
    timeDisplay: byId("timeDisplay"),
    timerBtn: byId("timerBtn"),
    saveBtn: byId("saveBtn"),
    exportBtn: byId("exportBtn"),
    resetBtn: byId("resetBtn")
  };

  function byId(id) {
    return document.getElementById(id);
  }

  function loadState() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved && typeof saved === "object") {
        state = Object.assign(state, saved, {
          timerRunning: false,
          timerStartedAt: 0
        });
      }
    } catch (err) {
      state.records = {};
    }
  }

  function saveState() {
    var saved = Object.assign({}, state, {
      timerRunning: false,
      timerStartedAt: 0
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }

  function activeCourse() {
    return courses.find(function (course) { return course.id === state.courseId; }) || courses[0];
  }

  function activeModule() {
    var course = activeCourse();
    return course.modules.find(function (mod) { return mod.id === state.moduleId; }) || course.modules[0];
  }

  function recordKey() {
    return state.courseId + "::" + state.moduleId;
  }

  function currentRecord() {
    if (!state.records[recordKey()]) {
      state.records[recordKey()] = {};
    }
    return state.records[recordKey()];
  }

  function fallbackCheck(course, mod) {
    var concepts = mod.concepts && mod.concepts.length ? mod.concepts.join(", ") : "the key ideas";
    var representation = course.conceptUniverse.representations[0] || "a diagram or table";
    return {
      primitives: "Use these concept anchors: " + concepts + ". Add assumptions and variables.",
      representation: "Choose a representation such as " + representation + " and explain why it fits.",
      tinyCase: "Create the smallest case where " + mod.title + " changes an answer, then run it.",
      boundary: "Name an assumption that would make this module's explanation fail.",
      transfer: "Apply the same structure to a different surface case and say what stays invariant.",
      external: "Find a matching OCW problem set or exam item after you finish the internal check."
    };
  }

  function checkFor(mod, course) {
    return mod.check || fallbackCheck(course, mod);
  }

  function initSelectors() {
    els.courseSelect.innerHTML = courses.map(function (course) {
      return '<option value="' + escapeHtml(course.id) + '">' + escapeHtml(course.title) + '</option>';
    }).join("");
    els.courseSelect.value = state.courseId;
    renderModuleOptions();
  }

  function renderModuleOptions() {
    var course = activeCourse();
    els.moduleSelect.innerHTML = course.modules.map(function (mod) {
      return '<option value="' + escapeHtml(mod.id) + '">' + escapeHtml(mod.track + " - " + mod.title) + '</option>';
    }).join("");
    if (!course.modules.some(function (mod) { return mod.id === state.moduleId; })) {
      state.moduleId = course.modules[0].id;
    }
    els.moduleSelect.value = state.moduleId;
  }

  function render() {
    var course = activeCourse();
    var mod = activeModule();
    var check = checkFor(mod, course);
    var rec = currentRecord();

    els.trackLabel.textContent = mod.track;
    els.moduleTitle.textContent = mod.title;
    els.moduleSummary.textContent = mod.summary;
    els.supportBadge.textContent = (mod.support || "medium").toUpperCase() + " support";

    els.primitiveHint.textContent = check.primitives;
    els.representationHint.textContent = check.representation;
    els.tinyCaseHint.textContent = check.tinyCase;
    els.boundaryHint.textContent = check.boundary;
    els.transferHint.textContent = check.transfer;
    els.externalHint.textContent = check.external;

    els.confidence.value = rec.confidence || 50;
    els.confidenceValue.textContent = els.confidence.value;
    ["goal", "primitives", "representation", "tinyCase", "boundary", "transfer", "repair", "benchmarkResult"].forEach(function (name) {
      els[name].value = rec[name] || "";
    });

    renderConcepts(course, mod);
    renderBenchmarks(course, mod);
    renderScore(rec.score || null);
    updateTime();
  }

  function renderConcepts(course, mod) {
    var universe = course.conceptUniverse;
    var selected = mod.concepts || [];
    els.conceptList.innerHTML = selected.map(function (concept) {
      return '<span class="concept-pill">' + escapeHtml(concept) + '</span>';
    }).join("");
    drawConceptSvg(universe, selected);
  }

  function drawConceptSvg(universe, selected) {
    var svg = els.conceptSvg;
    svg.innerHTML = "";
    svg.setAttribute("viewBox", "0 0 420 220");
    var groups = [
      { label: "Primitives", x: 48, y: 42, color: "#0b7a75", items: universe.primitives.slice(0, 4) },
      { label: "Represent", x: 210, y: 42, color: "#b98719", items: universe.representations.slice(0, 4) },
      { label: "Evidence", x: 132, y: 150, color: "#b24a3b", items: universe.reasoningMoves.slice(0, 4) }
    ];
    line(svg, 100, 58, 210, 58);
    line(svg, 260, 58, 196, 140);
    line(svg, 88, 60, 150, 140);
    groups.forEach(function (group) {
      circle(svg, group.x, group.y, 32, group.color);
      text(svg, group.x, group.y + 4, group.label, "#fff", 13, "middle", 800);
    });
    selected.slice(0, 5).forEach(function (concept, index) {
      var x = 36 + index * 76;
      var y = 98 + (index % 2) * 28;
      var isLong = concept.length > 13;
      rect(svg, x - 26, y - 14, isLong ? 98 : 72, 26, "#ffffff", "#d7ddd8");
      text(svg, x + (isLong ? 22 : 10), y + 4, trim(concept, 14), "#1d2524", 11, "middle", 700);
    });
  }

  function renderBenchmarks(course, mod) {
    var check = checkFor(mod, course);
    els.benchmarks.innerHTML = course.externalBenchmarks.map(function (item) {
      return [
        '<div class="benchmark">',
        '<a href="' + escapeAttr(item.url) + '" target="_blank" rel="noreferrer">' + escapeHtml(item.label) + '</a>',
        '<p>' + escapeHtml(item.kind) + '</p>',
        '<p>' + escapeHtml(item.bestFor) + '</p>',
        '</div>'
      ].join("");
    }).join("");
    if (check.external) {
      els.benchmarks.insertAdjacentHTML("afterbegin", '<div class="benchmark"><strong>Recommended now</strong><p>' + escapeHtml(check.external) + '</p></div>');
    }
  }

  function collectForm() {
    return {
      confidence: Number(els.confidence.value),
      goal: els.goal.value.trim(),
      primitives: els.primitives.value.trim(),
      representation: els.representation.value.trim(),
      tinyCase: els.tinyCase.value.trim(),
      boundary: els.boundary.value.trim(),
      transfer: els.transfer.value.trim(),
      repair: els.repair.value.trim(),
      benchmarkResult: els.benchmarkResult.value.trim(),
      timerSeconds: state.timerSeconds,
      updatedAt: new Date().toISOString()
    };
  }

  function saveDraft(showMessage) {
    var rec = Object.assign(currentRecord(), collectForm());
    state.records[recordKey()] = rec;
    saveState();
    if (showMessage) toast("Draft saved locally.");
    return rec;
  }

  function scoreRecord(rec, mod, course) {
    var check = checkFor(mod, course);
    var keywordPool = []
      .concat(mod.concepts || [])
      .concat(course.conceptUniverse.primitives || [])
      .concat(course.conceptUniverse.reasoningMoves || []);
    var scores = {
      goal: Math.max(lengthScore(rec.goal, 36), keywordScore(rec.goal, mod.concepts || [])),
      structure: Math.round((keywordScore(rec.primitives, keywordPool) + lengthScore(rec.primitives, 80)) / 2),
      representation: Math.round((keywordScore(rec.representation, course.conceptUniverse.representations) + lengthScore(rec.representation, 72)) / 2),
      tinyCase: Math.round((tinyCaseScore(rec.tinyCase) + keywordScore(rec.tinyCase, mod.concepts || [])) / 2),
      boundary: Math.round((boundaryScore(rec.boundary) + lengthScore(rec.boundary, 70)) / 2),
      transfer: Math.round((transferScore(rec.transfer, mod.title) + lengthScore(rec.transfer, 80)) / 2),
      benchmark: rec.benchmarkResult ? Math.min(100, 40 + lengthScore(rec.benchmarkResult, 80)) : 20
    };
    var evidenceAverage = average([
      scores.goal,
      scores.structure,
      scores.representation,
      scores.tinyCase,
      scores.boundary,
      scores.transfer
    ]);
    scores.calibration = Math.max(0, 100 - Math.abs(Number(rec.confidence || 0) - evidenceAverage));
    var overall = Math.round(average([
      scores.goal,
      scores.structure,
      scores.representation,
      scores.tinyCase,
      scores.boundary,
      scores.transfer,
      scores.calibration
    ]));
    var weak = Object.keys(scores).filter(function (key) {
      return ["benchmark"].indexOf(key) === -1 && scores[key] < 65;
    });
    return {
      overall: overall,
      scores: scores,
      weak: weak,
      readiness: readinessLabel(overall),
      check: check,
      nextReview: reviewDate(overall),
      externalRecommendation: check.external
    };
  }

  function renderScore(score) {
    var labels = {
      goal: "Goal",
      structure: "Blocks",
      representation: "Shape",
      tinyCase: "Tiny case",
      boundary: "Edge",
      transfer: "Transfer",
      calibration: "Calibrate",
      benchmark: "Benchmark"
    };
    if (!score) {
      els.scoreRing.style.setProperty("--score", 0);
      els.scoreValue.textContent = "0";
      els.scoreSummary.textContent = "No evidence yet. A score appears after your first check.";
      els.breakdown.innerHTML = "";
      els.weakLinks.innerHTML = "<li>Your weak links will show up here after scoring.</li>";
      els.nextReview.textContent = "No review scheduled yet.";
      updateLadder(0);
      return;
    }
    els.scoreRing.style.setProperty("--score", score.overall);
    els.scoreValue.textContent = String(score.overall);
    els.scoreSummary.textContent = score.readiness + ". Confidence is checked against evidence, so clear-sounding weak answers stay visible.";
    els.breakdown.innerHTML = Object.keys(labels).map(function (key) {
      var value = score.scores[key] || 0;
      return '<div class="bar-row"><span>' + labels[key] + '</span><span class="bar-track"><span class="bar-fill" style="width:' + value + '%"></span></span><strong>' + value + '</strong></div>';
    }).join("");
    els.weakLinks.innerHTML = score.weak.length
      ? score.weak.map(function (key) { return "<li>" + repairText(key) + "</li>"; }).join("")
      : "<li>No major weak link. Try an outside benchmark to keep the score honest.</li>";
    els.nextReview.textContent = score.nextReview;
    updateLadder(score.overall);
  }

  function updateLadder(overall) {
    var thresholds = {
      orientation: 20,
      structure: 45,
      operation: 58,
      boundary: 70,
      transfer: 82,
      calibration: 90
    };
    document.querySelectorAll(".ladder div").forEach(function (step) {
      var name = step.getAttribute("data-step");
      step.classList.toggle("active", overall >= thresholds[name]);
    });
  }

  function repairText(key) {
    var map = {
      goal: "Make the goal sharper. Say what you want to do with the idea.",
      structure: "Ground the idea in blocks. Name objects, variables, units, and assumptions.",
      representation: "Give the idea a shape. Draw or describe the table, equation, graph, or diagram.",
      tinyCase: "Run a smaller case. Use numbers or a formal relation before trusting the overview.",
      boundary: "Find the edge. Name the assumption that breaks the explanation.",
      transfer: "Move the idea. Change the surface case and keep the invariant structure.",
      calibration: "Tune confidence. Predict score before checking, then compare."
    };
    return map[key] || "Repair this evidence area before moving on.";
  }

  function lengthScore(value, targetChars) {
    if (!value) return 0;
    return Math.min(100, Math.round((value.trim().length / targetChars) * 100));
  }

  function keywordScore(value, keywords) {
    if (!value || !keywords || !keywords.length) return lengthScore(value || "", 80);
    var normalized = normalize(value);
    var hits = keywords.filter(function (keyword) {
      return normalize(keyword).split(/\s+/).some(function (part) {
        return part.length > 3 && normalized.indexOf(part) !== -1;
      });
    }).length;
    return Math.min(100, Math.round((hits / Math.min(5, keywords.length)) * 100));
  }

  function tinyCaseScore(value) {
    if (!value) return 0;
    var hasNumber = /[0-9]|=|sum|log|if|then|table|case/i.test(value);
    return Math.min(100, lengthScore(value, hasNumber ? 90 : 130));
  }

  function boundaryScore(value) {
    if (!value) return 0;
    var hasBoundary = /break|fail|unless|except|assum|boundary|wrong|not apply|violat/i.test(value);
    return Math.min(100, lengthScore(value, hasBoundary ? 70 : 120));
  }

  function transferScore(value, title) {
    if (!value) return 0;
    var normalized = normalize(value);
    var titleWords = normalize(title).split(/\s+/).filter(function (word) { return word.length > 3; });
    var surfaceOverlap = titleWords.filter(function (word) { return normalized.indexOf(word) !== -1; }).length;
    var hasTransferCue = /map|same structure|different|changed|surface|invariant|apply|transfer/i.test(value);
    var base = lengthScore(value, hasTransferCue ? 80 : 120);
    return Math.max(0, Math.min(100, base - Math.max(0, surfaceOverlap - 2) * 5));
  }

  function average(values) {
    return Math.round(values.reduce(function (sum, value) { return sum + value; }, 0) / values.length);
  }

  function readinessLabel(score) {
    if (score >= 90) return "Calibrated mastery candidate";
    if (score >= 82) return "Transfer-ready, pending external check";
    if (score >= 70) return "Guided reasoning looks usable";
    if (score >= 55) return "Overview exists, details still fragile";
    return "Orientation only";
  }

  function reviewDate(score) {
    var days = score >= 85 ? 7 : score >= 65 ? 3 : 1;
    var date = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    return "Review on " + date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) + ".";
  }

  function updateTime() {
    var total = state.timerSeconds;
    if (state.timerRunning) {
      total += Math.floor((Date.now() - state.timerStartedAt) / 1000);
    }
    var mins = Math.floor(total / 60);
    var secs = total % 60;
    els.timeDisplay.textContent = mins + " min " + String(secs).padStart(2, "0") + " sec";
  }

  function startTimer() {
    state.timerRunning = true;
    state.timerStartedAt = Date.now();
    els.timerBtn.textContent = "Stop";
    timerHandle = setInterval(updateTime, 1000);
  }

  function stopTimer() {
    if (state.timerRunning) {
      state.timerSeconds += Math.floor((Date.now() - state.timerStartedAt) / 1000);
    }
    state.timerRunning = false;
    state.timerStartedAt = 0;
    els.timerBtn.textContent = "Start";
    clearInterval(timerHandle);
    timerHandle = null;
    saveDraft(false);
    updateTime();
  }

  function exportReport() {
    saveDraft(false);
    var course = activeCourse();
    var mod = activeModule();
    var rec = currentRecord();
    var payload = {
      exportedAt: new Date().toISOString(),
      course: course.title,
      module: mod.title,
      record: rec,
      score: rec.score || null
    };
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = course.id + "-" + mod.id + "-reasoning-report.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function resetAll() {
    var confirmed = window.confirm("This clears the local Reasoning Gym drafts and scores stored in this browser.");
    if (!confirmed) return;
    localStorage.removeItem(STORAGE_KEY);
    state.records = {};
    state.timerSeconds = 0;
    if (state.timerRunning) stopTimer();
    saveState();
    render();
    toast("Local Reasoning Gym data cleared.");
  }

  function toast(message) {
    var node = document.createElement("div");
    node.className = "toast";
    node.textContent = message;
    document.body.appendChild(node);
    setTimeout(function () { node.remove(); }, 2600);
  }

  function normalize(value) {
    return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, "&#096;");
  }

  function trim(value, max) {
    return value.length > max ? value.slice(0, max - 1) + "." : value;
  }

  function svgEl(name) {
    return document.createElementNS("http://www.w3.org/2000/svg", name);
  }

  function line(svg, x1, y1, x2, y2) {
    var node = svgEl("line");
    node.setAttribute("x1", x1);
    node.setAttribute("y1", y1);
    node.setAttribute("x2", x2);
    node.setAttribute("y2", y2);
    node.setAttribute("stroke", "#a9b4af");
    node.setAttribute("stroke-width", "2");
    svg.appendChild(node);
  }

  function circle(svg, x, y, r, fill) {
    var node = svgEl("circle");
    node.setAttribute("cx", x);
    node.setAttribute("cy", y);
    node.setAttribute("r", r);
    node.setAttribute("fill", fill);
    svg.appendChild(node);
  }

  function rect(svg, x, y, w, h, fill, stroke) {
    var node = svgEl("rect");
    node.setAttribute("x", x);
    node.setAttribute("y", y);
    node.setAttribute("width", w);
    node.setAttribute("height", h);
    node.setAttribute("rx", "6");
    node.setAttribute("fill", fill);
    node.setAttribute("stroke", stroke);
    svg.appendChild(node);
  }

  function text(svg, x, y, value, fill, size, anchor, weight) {
    var node = svgEl("text");
    node.setAttribute("x", x);
    node.setAttribute("y", y);
    node.setAttribute("fill", fill);
    node.setAttribute("font-size", size);
    node.setAttribute("font-weight", weight || 600);
    node.setAttribute("text-anchor", anchor || "start");
    node.textContent = value;
    svg.appendChild(node);
  }

  function bindEvents() {
    els.courseSelect.addEventListener("change", function () {
      state.courseId = els.courseSelect.value;
      renderModuleOptions();
      render();
      saveState();
    });
    els.moduleSelect.addEventListener("change", function () {
      if (state.timerRunning) stopTimer();
      state.moduleId = els.moduleSelect.value;
      state.timerSeconds = currentRecord().timerSeconds || 0;
      render();
      saveState();
    });
    els.confidence.addEventListener("input", function () {
      els.confidenceValue.textContent = els.confidence.value;
    });
    els.form.addEventListener("submit", function (event) {
      event.preventDefault();
      var rec = saveDraft(false);
      rec.score = scoreRecord(rec, activeModule(), activeCourse());
      state.records[recordKey()] = rec;
      saveState();
      renderScore(rec.score);
      toast("Evidence scored. Your next repair move is ready.");
    });
    els.saveBtn.addEventListener("click", function () {
      saveDraft(true);
    });
    els.timerBtn.addEventListener("click", function () {
      if (state.timerRunning) stopTimer();
      else startTimer();
    });
    els.exportBtn.addEventListener("click", exportReport);
    els.resetBtn.addEventListener("click", resetAll);
    window.addEventListener("beforeunload", function () {
      if (state.timerRunning) stopTimer();
      else saveDraft(false);
    });
  }

  function init() {
    if (!courses.length) {
      document.body.innerHTML = "<main class=\"active-panel\"><h1>Reasoning Gym</h1><p>No course data found.</p></main>";
      return;
    }
    loadState();
    initSelectors();
    state.timerSeconds = currentRecord().timerSeconds || 0;
    bindEvents();
    render();
  }

  init();
})();
