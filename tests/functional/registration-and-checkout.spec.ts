import { test, expect } from '@playwright/test';
import { TestFacade } from '../domain/TestFacade';
import { UserFactory } from '../factories/UserFactory';
import { ProductFactory } from '../factories/ProductFactory';

test.describe('Juice Shop - Domain-level flows', () => {
  test('registers a new user and completes a checkout', async ({ page }) => {
    const facade = new TestFacade(page);
    const user = UserFactory.validUser();
    const products = [
      ProductFactory.appleJuice(1),
      ProductFactory.bananaJuice(2),
    ];

    await facade.users.register(user);
    await facade.users.login(user.email, user.password);

    await facade.shopping.addProductsToBasket(products);
    await facade.shopping.checkoutBasket();

    await expect(page.getByText('Thank you for your purchase')).toBeVisible();
  });
});

