import type { Page } from '@playwright/test';
import type { Product, Address, PaymentCard } from './models';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { BasketPage } from '../pages/BasketPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutDataFactory } from '../factories/CheckoutDataFactory';

/**
 * Domain-level service for shopping flows: add items, checkout, etc.
 */
export class ShoppingService {
  readonly home: HomePage;
  private readonly productPage: ProductPage;
  private readonly basket: BasketPage;
  private readonly checkout: CheckoutPage;

  constructor(private readonly page: Page) {
    this.home = new HomePage(page);
    this.productPage = new ProductPage(page);
    this.basket = new BasketPage(page);
    this.checkout = new CheckoutPage(page);
  }

  async addProductsToBasket(products: Product[]) {
    await this.home.open();
    await this.home.dismissWelcomeIfPresent();

    for (const product of products) {
      await this.productPage.addProductByName(product.name, product.quantity);
    }
  }

  async checkoutBasket(address?: Address, card?: PaymentCard) {
    const checkoutData =
      address && card
        ? { address, card }
        : CheckoutDataFactory.default();

    await this.home.openBasket();
    await this.basket.proceedToCheckout();
    await this.checkout.completeCheckoutFlow(
      checkoutData.address,
      checkoutData.card
    );
  }
}

