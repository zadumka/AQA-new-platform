# AQA-new-platform

## Tech Stack

- **Language:** JavaScript
- **Test Framework:** Playwright + playwright-bdd
- **BDD:** Gherkin (Cucumber)
- **Browser:** Chromium

## Project Structure

```
features/
  ├── *.feature              # Gherkin scenarios
  └── steps/
      └── *.steps.js         # Step definitions (Given/When/Then)
pages/
  └── *.js                   # Page Object classes
tests/
  └── *.spec.js              # Standard Playwright tests
```

## Commands

| Command | Description |
|---|---|
| `npm test` | Run all tests (headless) |
| `npm run test:headed` | Run with open browser |
| `npm run test:ui` | Interactive Playwright UI mode |
| `npm run test:report` | Open HTML report |

## Running Specific Scenarios

### By scenario name

```bash
npx bddgen && npx playwright test --grep "Navigate to courses page"
```

### By tag

Add a tag to the scenario in `.feature` file:

```gherkin
@smoke
Scenario: Navigate to courses page
  Given I open the landing page
  ...
```

```bash
npx bddgen && npx playwright test --grep "@smoke"
```

### In headed mode

Add `--headed` to any command:

```bash
npx bddgen && npx playwright test --grep "@smoke" --headed
```

---

## Step-by-step: How this project was built

### Крок 1. Ініціалізація проєкту

```bash
npm init -y
```

Створює `package.json` — файл конфігурації Node.js проєкту.

### Крок 2. Встановлення Playwright

```bash
npm install -D @playwright/test
npx playwright install chromium
```

- `@playwright/test` — фреймворк для E2E тестування
- `npx playwright install chromium` — завантажує браузер Chromium

### Крок 3. Створення playwright.config.js

Базова конфігурація Playwright:

```js
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: true,
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
```

### Крок 4. Створення Page Objects (pages/)

Page Object Model — патерн, де кожна сторінка описана як клас з локаторами та методами.

Файл `pages/lend.js`:

```js
class LendPage {
  constructor(page) {
    this.page = page;
    this.heading = page.locator("h1");
    this.buyButton = page.locator('a[href="/courses"]', {
      hasText: "Придбати курс",
    });
  }

  async open() {
    await this.page.goto("https://ph-stacey.vercel.app/");
  }

  async clickBuyCourse() {
    await this.buyButton.first().click();
  }
}

module.exports = { LendPage };
```

**Що тут відбувається:**
- `constructor` — зберігає локатори (селектори елементів)
- Методи (`open`, `clickBuyCourse`) — дії на сторінці
- `module.exports` — експорт класу для використання в тестах

### Крок 5. Встановлення BDD залежностей

```bash
npm install -D playwright-bdd @cucumber/cucumber
```

- `playwright-bdd` — інтеграція Playwright з BDD (Gherkin синтаксис)
- `@cucumber/cucumber` — бібліотека Cucumber (парсить Given/When/Then)

### Крок 6. Оновлення playwright.config.js для BDD

```js
const { defineConfig, devices } = require("@playwright/test");
const { defineBddConfig } = require("playwright-bdd");

const testDir = defineBddConfig({
  features: "features/*.feature",       // де шукати .feature файли
  steps: "features/steps/*.steps.js",   // де шукати step definitions
});

module.exports = defineConfig({
  testDir,  // тепер вказує на .features-gen/ (автогенерована папка)
  // ... решта конфігу
});
```

**Що змінилось:**
- `defineBddConfig()` — повертає шлях до `.features-gen/`, куди генеруються тести
- `testDir` тепер вказує не на `tests/`, а на `.features-gen/`

### Крок 7. Створення .feature файлу (Gherkin)

Файл `features/lend.feature`:

```gherkin
Feature: Ph-Stacey Landing Page

  Scenario: Heading on the main page
    Given I open the landing page
    Then the heading should contain "Курс з"
    And the heading should contain "обробки фото"
```

**Gherkin синтаксис:**
- `Feature` — назва фічі (групує сценарії)
- `Scenario` — один тестовий сценарій
- `Given` — передумова (налаштування)
- `When` — дія користувача
- `Then` — очікуваний результат
- `And` — продовження попереднього кроку

### Крок 8. Створення step definitions

Файл `features/steps/lend.steps.js`:

```js
const { expect } = require("@playwright/test");
const { createBdd } = require("playwright-bdd");
const { LendPage } = require("../../pages/lend");

const { Given, When, Then } = createBdd();

Given("I open the landing page", async ({ page }) => {
  const lendPage = new LendPage(page);
  await lendPage.open();
});

Then("the heading should contain {string}", async ({ page }, text) => {
  const heading = page.locator("h1");
  await expect(heading).toContainText(text);
});
```

**Що тут відбувається:**
- `createBdd()` — створює функції `Given`, `When`, `Then`
- Кожен степ зв'язує текст з Gherkin з реальним кодом
- `{string}` — параметр, який підставляється з .feature файлу (текст в лапках)
- Степи використовують Page Objects для взаємодії зі сторінкою

### Крок 9. Оновлення npm скриптів

В `package.json`:

```json
"scripts": {
  "test": "npx bddgen && npx playwright test",
  "test:headed": "npx bddgen && npx playwright test --headed",
  "test:ui": "npx bddgen && npx playwright test --ui"
}
```

`npx bddgen` — генерує `.spec.js` файли з `.feature` файлів в папку `.features-gen/`. Виконується перед кожним запуском тестів.

### Крок 10. Додати .features-gen/ в .gitignore

```
.features-gen/
```

Ця папка генерується автоматично — не потрібно зберігати її в git.

---

## Схема роботи BDD

```
.feature (Gherkin)  →  steps.js (Given/When/Then)  →  pages/*.js (Page Objects)
    ЩО тестуємо           ЯК реалізуємо                 ДЕ взаємодіємо
```

Для кожної нової фічі створюємо:
1. `features/<name>.feature` — сценарій
2. `features/steps/<name>.steps.js` — реалізація кроків
3. `pages/<Name>Page.js` — Page Object (якщо нова сторінка)
