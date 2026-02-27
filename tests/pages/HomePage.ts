import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  protected readonly path = '/';

  private readonly dismissWelcomeSelector =
    'button[aria-label="Close Welcome Banner"]';
  private readonly accountMenuSelector =
    'button[aria-label="Show/hide account menu"]';
  private readonly loginNavSelector = 'button[aria-label="Go to login page"]';
  private readonly registerNavSelector =
    'button[aria-label="Go to registration page"]';
  private readonly basketNavSelector =
    'button[aria-label="Show the shopping cart"]';

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto();
  }

  async dismissWelcomeIfPresent() {
    const banner = this.page.locator(this.dismissWelcomeSelector);
    if (await banner.isVisible().catch(() => false)) {
      await banner.click();
    }
  }

  async goToLogin() {
    await this.page.locator(this.accountMenuSelector).click();
    await this.page.locator(this.loginNavSelector).click();
  }

  async openRegistration() {
    await this.page.locator(this.accountMenuSelector).click();
    await this.page.locator(this.registerNavSelector).click();
  }

  async openBasket() {
    await this.page.locator(this.basketNavSelector).click();
  }
}

