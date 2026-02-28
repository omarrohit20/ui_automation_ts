import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import type { User } from '../domain/models';

export class RegistrationPage extends BasePage {
  protected readonly path = '/#/register';

  private readonly emailInput = '#emailControl';
  private readonly passwordInput = '#passwordControl';
  private readonly repeatPasswordInput = '#repeatPasswordControl';
  // Use an accessible role for the security question dropdown instead
  // the app uses an Angular Material component which didn't always render as
  // a `mat-select` element; locating by role is more reliable.
  // private readonly securityQuestionSelect = 'mat-select[formcontrolname="securityQuestion"]';
  private readonly securityAnswerInput = '#securityAnswerControl';
  private readonly registerButton = '#registerButton';

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto();
  }

  async register(user: User) {
    // the banner and cookie consent can show up after navigation; close them if
    // they appear. we repeat these steps later as well because the welcome banner
    // tends to re-open a moment after being dismissed.
    await this.page.getByRole('button', { name: /dismiss cookie message/i })
      .click({ timeout: 5000 })
      .catch(() => {});
    await this.page.getByRole('button', { name: /Close Welcome Banner|Dismiss/i })
      .click({ timeout: 5000 })
      .catch(() => {});

    await this.page.fill(this.emailInput, user.email);
    await this.page.fill(this.passwordInput, user.password);
    await this.page.fill(this.repeatPasswordInput, user.password);

    // Security question is optional in domain model; use a default if not set.
    // dismiss any popups that may have appeared again (welcome banner sometimes
    // re-opens when the page is idle)
    await this.page.getByRole('button', { name: /dismiss cookie message/i })
      .click({ timeout: 5000 })
      .catch(() => {});
    await this.page.getByRole('button', { name: /Close Welcome Banner|Dismiss/i })
      .click({ timeout: 5000 })
      .catch(() => {});

    const question = this.page.getByRole('combobox', { name: /Security Question/i });
    await question.waitFor({ state: 'visible', timeout: 5000 });
    await question.click();
    await this.page.getByRole('option').first().click();
    // wait for dropdown backdrop to disappear before moving on
    await this.page.waitForSelector('.cdk-overlay-backdrop', { state: 'hidden', timeout: 5000 }).catch(() => {});

    await this.page.fill(this.securityAnswerInput, user.securityAnswer ?? 'test');
    // ensure any temporary overlays (language snackbars, dropdown backdrops, etc.)
    // have gone away before we try to submit the form
    await this.page.waitForSelector('.mat-snack-bar-container', { state: 'detached', timeout: 5000 }).catch(() => {});
    await this.page.waitForSelector('.cdk-overlay-backdrop', { state: 'hidden', timeout: 5000 }).catch(() => {});
    await this.page.click(this.registerButton);
  }
}

