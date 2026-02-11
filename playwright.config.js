// @ts-check
const { defineConfig, devices } = require("@playwright/test");
const { defineBddConfig } = require("playwright-bdd");

const testDir = defineBddConfig({
  features: "features/*.feature",
  steps: "features/steps/*.steps.js",
});

module.exports = defineConfig({
  testDir,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: "https://example.com",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
