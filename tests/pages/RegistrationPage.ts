import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import type { User } from '../domain/models';

export class RegistrationPage extends BasePage {
  protected readonly path = '/#/register';

  private readonly emailInput = '#emailControl';
  private readonly passwordInput = '#passwordControl';
  private readonly repeatPasswordInput = '#repeatPasswordControl';
  private readonly securityQuestionSelect = 'mat-select[formcontrolname="securityQuestion"]';
  private readonly securityAnswerInput = '#securityAnswerControl';
  private readonly registerButton = '#registerButton';

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto();
  }

  async register(user: User) {
    await this.page.fill(this.emailInput, user.email);
    await this.page.fill(this.passwordInput, user.password);
    await this.page.fill(this.repeatPasswordInput, user.password);

    // Security question is optional in domain model; use a default if not set.
    await this.page.locator(this.securityQuestionSelect).click();
    await this.page.getByRole('option').first().click();

    await this.page.fill(this.securityAnswerInput, user.securityAnswer ?? 'test');
    await this.page.click(this.registerButton);
  }
}

