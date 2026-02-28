import { test, expect } from '@playwright/test';
import { TestFacade } from '../domain/TestFacade';
import { UserFactory } from '../factories/UserFactory';

test.describe('Juice Shop - Functional - Login (data-driven)', () => {
  const scenarios = [
    { name: 'valid user', user: UserFactory.validUser(), shouldSucceed: true },
    { name: 'invalid password user', user: UserFactory.invalidPasswordUser(), shouldSucceed: false },
  ] as const;

  for (const scenario of scenarios) {
    test(`logs in with ${scenario.name}`, async ({ page }) => {
      const facade = new TestFacade(page);

      // Ensure user exists for positive case by registering first.
      if (scenario.shouldSucceed) {
        await facade.users.register(scenario.user);
      }

      await facade.users.login(scenario.user.email, scenario.user.password);

      if (scenario.shouldSucceed) {
        // the email is shown inside the account menu after successful login
        await page.getByRole('button', { name: 'Account' }).click();
        const menu = page.locator('mat-nav-list');
        await expect(menu.getByText(scenario.user.email)).toBeVisible();
      } else {
        await expect(page.getByText('Invalid email or password.')).toBeVisible();
      }
    });
  }
});

