import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  protected readonly path = '/#/search';

  private readonly addToBasketButton = 'button[aria-label^="Add to Basket"]';

  constructor(page: Page) {
    super(page);
  }

  async addProductByName(name: string, quantity: number) {
    // On Juice Shop, products are listed on the home page; we can filter by name and click Add to Basket.
    const card = this.page.getByRole('heading', { name }).locator('..').locator('..');
    for (let i = 0; i < quantity; i += 1) {
      await card.locator(this.addToBasketButton).click();
    }
  }
}

