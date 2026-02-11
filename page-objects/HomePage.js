class HomePage {
  constructor(page) {
    this.page = page;
    this.heading = page.locator("h1");
    this.moreInfoLink = page.locator('a:has-text("More information")');
  }

  async open() {
    await this.page.goto("/");
  }

  async getHeadingText() {
    return await this.heading.textContent();
  }

  async clickMoreInfo() {
    await this.moreInfoLink.click();
  }
}

module.exports = { HomePage };