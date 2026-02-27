import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BasketPage extends BasePage {
  protected readonly path = '/#/basket';

  private readonly checkoutButton = 'button#checkoutButton';

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto();
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
  }
}

