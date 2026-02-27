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

      await facade.users.login(scenario.user);

      if (scenario.shouldSucceed) {
        await expect(page.getByText(scenario.user.email)).toBeVisible();
      } else {
        await expect(page.getByText('Invalid email or password.')).toBeVisible();
      }
    });
  }
});

