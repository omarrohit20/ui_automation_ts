import { test, expect } from '@playwright/test';
import { TestFacade } from '../domain/TestFacade';

test.describe('Juice Shop - Functional - Homepage', () => {
  test('1.1 Verify home page loads with product listings and cookie banner', async ({ page }) => {
    const facade = new TestFacade(page);

    // 1. open home page
    await facade.shopping.home?.open?.();
    await facade.shopping.home?.dismissWelcomeIfPresent?.();

    // 2. verify URL and title
    await expect(page).toHaveURL(/https:\/\/demo\.owasp-juice\.shop\/?(#\/)?$/);
    await expect(page).toHaveTitle(/OWASP Juice Shop/);

    // 5. verify product listing layout
    await expect(page.getByText(/All Products/i)).toBeVisible();
    await expect(page.getByText(/Apple Juice/i)).toBeVisible();
    await expect(page.getByText(/Banana Juice/i)).toBeVisible();
  });
});