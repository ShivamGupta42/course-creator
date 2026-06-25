const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30000,
  use: {
    screenshot: "only-on-failure",
    trace: "on-first-retry"
  },
  webServer: {
    command: "python3 -m http.server 8765 --bind 127.0.0.1 --directory ../..",
    url: "http://127.0.0.1:8765/experiences/reasoning-gym/",
    reuseExistingServer: true,
    timeout: 10000
  }
});
