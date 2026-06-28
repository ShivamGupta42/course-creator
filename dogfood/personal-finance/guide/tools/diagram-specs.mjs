// One spec per built module. Labels/values only, never coordinates.
// Run from guide/: node tools/diagrams.mjs
export const SPECS = {
  "07-compound-interest": {
    archetype: "curve",
    title: "A balance growing on itself",
    xlabel: "years",
    ylabel: "balance",
    shape: "concave",
    points: [
      { x: 0.33, y: 0.25, label: "10 yr" },
      { x: 0.66, y: 0.5, label: "20 yr" },
      { x: 0.95, y: 0.95, label: "30 yr" },
    ],
    caption: "Same 7% each year, but bigger dollar jumps each decade: interest earning its own interest.",
  },
  "22-spotting-scams": {
    archetype: "scorecard",
    title: "Each scam tell raises the risk bar",
    rows: [
      { label: "Urgency", score: 4, max: 5 },
      { label: "Asks for a code", score: 5, max: 5 },
      { label: "Irreversible payment", score: 5, max: 5 },
      { label: "Sender mismatch", score: 3, max: 5 },
    ],
    caption: "No single sign is proof; two or three together mean stop and verify on a trusted channel.",
  },
};
