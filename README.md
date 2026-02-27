## UI Automation Framework (Playwright + TypeScript)

This project demonstrates a modern UI automation framework for `https://demo.owasp-juice.shop` using:

- **Playwright + TypeScript** with:
  - Page Object, Flow, Facade, Factory, and Builder patterns.
  - Configurable environments.
  - API client and response validation.
  - Data-driven functional, accessibility, and security tests.

### Project structure (Playwright-focused)

- `playwright.config.ts` – Playwright runner configuration (uses `tests/config/env.ts` for base URL).
- `tests/config/env.ts` – small environment config layer (`TEST_ENV=dev|qa|prod`).
- `tests/pages/*` – **Page Objects** (`HomePage`, `LoginPage`, `RegistrationPage`, `ProductPage`, `BasketPage`, `CheckoutPage`, `BasePage`).
- `tests/flows/*` – **Flows** (login, registration).
- `tests/domain/*` – **Domain services + Facade** (`UserService`, `ShoppingService`, `TestFacade`, models).
- `tests/factories/*` – **Factories + Builder** (`UserBuilder`/`UserFactory`, `ProductFactory`).
- `tests/functional/*` – functional UI tests (login, registration + checkout using the domain facade).
- `tests/accessibility/*` – axe-core a11y tests.
- `tests/security/*` – OWASP ZAP security tests.
- `tests/api/*` – API client and response validation tests.

### Configurable endpoints / environments

- Set `TEST_ENV` when running Playwright to switch environment:

```bash
TEST_ENV=dev   npm run pw:test
TEST_ENV=qa    npm run pw:test
TEST_ENV=prod  npm run pw:test
```

- `tests/config/env.ts` maps env name → `baseUrl`. Playwright reads this and sets `use.baseURL`.

### Design patterns

- **Page Object**: encapsulates selectors and actions per page.
- **Flow**: sequences of page-level steps (e.g. registration).
- **Facade**: `TestFacade` exposes high-level business flows (`users`, `shopping`) to tests.
- **Factory + Builder**:
  - `UserBuilder` builds customizable `User` instances (`withEmail`, `withPassword`, `withSecurity`, `build`).
  - `UserFactory` and `ProductFactory` provide ready-made valid/invalid data.

### Data-driven tests

- `tests/functional/login.spec.ts` loops through multiple login scenarios (valid / invalid) using `UserFactory` and `TestFacade`.
- You can extend the `scenarios` array or externalize to JSON and load it in the test to expand coverage.

### API response validation

- `tests/api/juiceApiClient.ts` – small API client for `/rest/products`:
  - Uses Playwright’s `request` fixture.
  - Validates HTTP status and response shape (ensures `data` is an array).
- `tests/api/products.spec.ts` – asserts that the product list is returned and non-empty.

### Cypress usage (summary)

- Functional: `npm run test:functional`
- Accessibility: `npm run test:a11y`
- Security (ZAP): `npm run test:security`

### Playwright usage

- All tests: `npm run pw:test`
- Functional only: `npm run pw:test:functional`
- Accessibility only: `npm run pw:test:a11y`
- Security (ZAP) only: `npm run pw:test:security`

> For ZAP-based tests (Cypress or Playwright), start a ZAP daemon locally and configure `ZAP_API_KEY`, `ZAP_HOST`, `ZAP_PORT` environment variables before running the security scripts.

