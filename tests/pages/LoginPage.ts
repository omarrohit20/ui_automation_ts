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
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}

