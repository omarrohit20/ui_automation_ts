import type { Page } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;
  protected abstract readonly path: string;

  protected constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(this.path);
  }

  async expectUrlContains(fragment: string) {
    await this.page.waitForURL((url) => url.toString().includes(fragment));
  }
}

