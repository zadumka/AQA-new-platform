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
