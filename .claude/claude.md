# AQA New Platform

## Project Overview
Automated testing project for web applications using JavaScript, Playwright and BDD (playwright-bdd + Cucumber).

## Tech Stack
- **Language:** JavaScript
- **Test Framework:** Playwright (@playwright/test) + playwright-bdd
- **BDD:** Gherkin (Cucumber)
- **Browser:** Chromium

## Project Structure
- `features/` — Gherkin `.feature` files
- `features/steps/` — step definitions (`*.steps.js`)
- `pages/` — Page Object classes
- `tests/` — standard Playwright tests (`*.spec.js`)
- `.features-gen/` — auto-generated files (in `.gitignore`)
- `playwright.config.js` — Playwright + BDD configuration

## Conventions
- Use Page Object Model pattern for all pages
- Page classes should be named `<PageName>Page.js` in `pages/`
- BDD scenarios go in `features/<name>.feature`
- Step definitions go in `features/steps/<name>.steps.js`
- Steps import and use Page Objects from `pages/`
- Use `baseURL` from config — in Page Objects use relative paths (e.g. `page.goto("/")`)

## Commands

| Command | Description |
|---|---|
| `npm test` | Run all tests (headless) |
| `npm run test:headed` | Run with open browser |
| `npm run test:ui` | Interactive Playwright UI mode |
| `npm run test:report` | Open HTML report |

## Running Specific Scenarios

```bash
# By name
npx bddgen && npx playwright test --grep "Scenario name"

# By tag (@smoke, @regression, etc.)
npx bddgen && npx playwright test --grep "@smoke"

# In headed mode — add --headed
npx bddgen && npx playwright test --grep "@smoke" --headed
```

## Notes
- Chromium only. Firefox/WebKit can be added later if needed.
- `npx bddgen` generates test files from `.feature` into `.features-gen/` before each run.