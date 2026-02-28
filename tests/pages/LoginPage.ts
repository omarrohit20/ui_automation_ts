import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  protected readonly path = '/#/login';

  private readonly emailInput = '#email';
  private readonly passwordInput = '#password';
  private readonly loginButton = '#loginButton';

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto();
  }

  async login(email: string, password: string) {
    // some overlays (welcome/banners) may appear moments after navigation,
    // ensure they're gone before interacting with inputs/buttons
    await this.page.getByRole('button', { name: /Close Welcome Banner|Dismiss/i })
      .click({ timeout: 5000 })
      .catch(() => {});
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    // wait for any dialog/backdrop that could intercept the click to vanish
    await this.page.waitForSelector('.mat-mdc-dialog-surface', { state: 'hidden', timeout: 5000 }).catch(() => {});
    await this.page.click(this.loginButton);
  }
}

