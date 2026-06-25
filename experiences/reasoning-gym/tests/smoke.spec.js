const { test, expect } = require("@playwright/test");

test("reasoning gym scores a module and renders learner model", async ({ page }) => {
  const baseUrl = process.env.BASE_URL || "http://127.0.0.1:8765";
  await page.goto(`${baseUrl}/experiences/reasoning-gym/`);
  await expect(page.getByRole("heading", { name: "Reasoning Gym" })).toBeVisible();
  const moduleSelect = page.getByLabel("Module", { exact: true });
  await expect(moduleSelect).toBeVisible();

  await moduleSelect.selectOption("01-entropy");
  await expect(page.getByRole("heading", { name: "Bits, Surprise, and Entropy" })).toBeVisible();

  await page.getByLabel(/Confidence before evidence/).fill("70");
  await page.getByLabel("What should this idea help you do?").fill("Compare sources by expected yes/no questions and explain when compression should be easier.");
  await page.getByLabel("Name the building blocks").fill("The primitives are outcomes, probabilities, surprise values, expected surprise, and bit units for the source distribution.");
  await page.getByLabel("Draw the shape").fill("I would draw a probability table with p(x), -log2 p(x), and p(x) times surprise, then sum the last column.");
  await page.getByLabel("Run a tiny case").fill("For a fair coin H is 1 bit because each outcome has probability 0.5. For 0.9 and 0.1, expected surprise is lower because one outcome is predictable.");
  await page.getByLabel("Find the edge").fill("The explanation fails if I talk about one rare observation instead of a full source distribution.");
  await page.getByLabel("Move it somewhere new").fill("A pantry source with mostly rice and a few spices has lower entropy than an evenly used pantry. The invariant is the probability distribution over next item.");
  await page.getByLabel("Note what the course should repair").fill("Need more examples that distinguish single-event surprise from distribution entropy.");
  await page.getByLabel("Benchmark attempt or plan").fill("Try MIT 6.050J bits and codes exercises after scoring this module.");
  await page.getByRole("button", { name: "Score my evidence" }).click();

  await expect(page.getByText(/Evidence scored/)).toBeVisible();
  const score = Number(await page.locator("#scoreValue").textContent());
  expect(score).toBeGreaterThan(50);
  await expect(page.getByText(/Review on/)).toBeVisible();
});
