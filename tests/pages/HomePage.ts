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
    // the welcome banner button doesn't reliably expose an aria-label in the DOM,
    // so locate by role/accessible name instead. the visible text is "Close
    // Welcome Banner" or simply "Dismiss" depending on language.
    const closeBtn = this.page.getByRole('button', { name: /Close Welcome Banner|Dismiss/i });
    // try clicking the button if it appears within a short window; ignore if
    // it never shows up.
    await closeBtn.click({ timeout: 5000 }).catch(() => {});
  }

  async dismissCookieConsentIfPresent() {
    // cookie consent dialog appears on first visit and blocks interactions;
    // the accessible name is "dismiss cookie message".
    const cookieBtn = this.page.getByRole('button', { name: /dismiss cookie message/i });
    await cookieBtn.click({ timeout: 5000 }).catch(() => {});
  }

  /**
   * Convenience helper that clears common modal/popups which can appear on any
   * page and interfere with normal flows.
   */
  async dismissAllPopups() {
    // some popups (cookie banner, welcome dialog, challenge notifications)
    // can appear a short time after the page loads. we repeatedly attempt to
    // close them for up to a few seconds so that callers can simply invoke this
    // once and be confident no overlay remains.
    const end = Date.now() + 5000;
    while (Date.now() < end) {
      let closedAnything = false;
      // cookie consent
      const cookieBtn = this.page.getByRole('button', { name: /dismiss cookie message/i });
      if (await cookieBtn.isVisible({ timeout: 500 }).catch(() => false)) {
        await cookieBtn.click();
        closedAnything = true;
      }
      // welcome banner
      const welcomeBtn = this.page.getByRole('button', { name: /Close Welcome Banner|Dismiss/i });
      if (await welcomeBtn.isVisible({ timeout: 500 }).catch(() => false)) {
        await welcomeBtn.click();
        closedAnything = true;
      }
      // generic close-X dialogs (challenge popup etc.)
      const closeX = this.page.getByRole('button', { name: 'X' });
      if (await closeX.isVisible({ timeout: 500 }).catch(() => false)) {
        await closeX.click();
        closedAnything = true;
      }
      if (!closedAnything) break;
    }
  }

  async goToLogin() {
    // open the account menu and wait for the login link to appear before clicking
    await this.page.locator(this.accountMenuSelector).click();
    const loginNav = this.page.locator(this.loginNavSelector);
    await loginNav.waitFor({ state: 'visible' });
    await loginNav.click();
  }

  async openRegistration() {
    // open the account menu and wait for the register link to become visible
    await this.page.locator(this.accountMenuSelector).click();
    const registerNav = this.page.locator(this.registerNavSelector);
    await registerNav.waitFor({ state: 'visible' });
    await registerNav.click();
  }

  async openBasket() {
    await this.page.locator(this.basketNavSelector).click();
  }
}

