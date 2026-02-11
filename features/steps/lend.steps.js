const { expect } = require("@playwright/test");
const { createBdd } = require("playwright-bdd");
const { LendPage, AboutPage } = require("../../page-objects/lend");

const { Given, When, Then } = createBdd();

Given("I open the landing page", async ({ page }) => {
  const lendPage = new LendPage(page);
  await lendPage.open();
});

When("I click {string} button", async ({ page }) => {
  const lendPage = new LendPage(page);
  await lendPage.clickBuyCourse();
});

When("I navigate to the Author page", async ({ page }) => {
  const lendPage = new LendPage(page);
  await lendPage.goToAuthorPage();
});

Then("the heading should contain {string}", async ({ page }, text) => {
  const heading = page.locator("h1");
  await expect(heading).toBeVisible();
  await expect(heading).toContainText(text);
});

Then("I should be on the courses page", async ({ page }) => {
  await expect(page).toHaveURL(/\/courses/);
});

Then("I should be on the about page", async ({ page }) => {
  await expect(page).toHaveURL(/\/about/);
});
