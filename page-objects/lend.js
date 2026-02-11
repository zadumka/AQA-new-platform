class LendPage {
  constructor(page) {
    this.page = page;
    this.heading = page.locator("h1");
    this.buyButton = page.locator('a[href="/courses"]', {
      hasText: "Придбати курс",
    });
    this.menuButton = page.getByText("МЕНЮ");
    this.authorLink = page.getByRole("link", { name: "Автор" });
  }

  async open() {
    await this.page.goto("https://ph-stacey.vercel.app/");
  }

  async getHeadingText() {
    return await this.heading.textContent();
  }

  async clickBuyCourse() {
    await this.buyButton.first().click();
  }

  async goToAuthorPage() {
    await this.menuButton.click();
    await this.authorLink.click();
  }
}

class AboutPage {
  constructor(page) {
    this.page = page;
    this.heading = page.locator("h1");
  }

  async getHeadingText() {
    return await this.heading.textContent();
  }
}

module.exports = { LendPage, AboutPage };