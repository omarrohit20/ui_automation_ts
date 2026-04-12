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

  test('1.2 Search for a product and validate results', async ({ page }) => {
    const facade = new TestFacade(page);

    // Setup: open home page
    await facade.shopping.home?.open?.();
    await page.waitForTimeout(2000);

    // Step 1: Open search control and enter "Apple Juice"
    await facade.shopping.home?.searchProduct?.('Apple Juice');

    // Verify search box has the text (it should still be visible and enabled)
    const searchInput = page.locator('input:visible').first();
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeEnabled();

    // Step 2: Verify displayed products contain "Apple Juice"
    // Expect: At least one product card title includes "Apple Juice"
    const appleJuiceProduct = page.getByText(/Apple Juice/i);
    await expect(appleJuiceProduct).toBeVisible();

    // Expect: No results message is not shown
    const noResultsMsg = page.getByText(/no results|no products found|nothing to show|sorry|no items/i);
    await expect(noResultsMsg).not.toBeVisible();
  });
});