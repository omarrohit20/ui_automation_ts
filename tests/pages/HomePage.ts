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
    await this.page.waitForTimeout(5000);
    const closeBtn = this.page.getByRole('button', { name: /Close Welcome Banner/i });
    await closeBtn.waitFor({ timeout: 5000 });
    // try clicking the button if it appears within a short window; ignore if
    // it never shows up.
    await closeBtn.click({ timeout: 5000 }).catch(() => {});
  }

  async dismissCookieConsentIfPresent() {
    // cookie consent dialog appears on first visit and blocks interactions;
    // the accessible name is "dismiss cookie message".
    await this.page.waitForTimeout(5000);
    const cookieBtn = this.page.getByRole('button', { name: /dismiss cookie message/i });
    await cookieBtn.waitFor({ timeout: 5000 });
    await cookieBtn.click({ timeout: 5000 }).catch(() => {});
  }

  /**
   * Convenience helper that clears common modal/popups which can appear on any
   * page and interfere with normal flows.
   */
  async dismissAllPopups() {
    // Close any overlay backdrops using Escape key
    await this.page.keyboard.press('Escape').catch(() => {});
    await this.page.waitForTimeout(500);
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

  async searchProduct(productName: string) {
    // Click the search icon in the toolbar with force to bypass any overlay issues
    const searchIcon = this.page.locator('mat-icon:has-text("search")').first();
    await searchIcon.click({ force: true, timeout: 5000 });
    await this.page.waitForTimeout(300);

    // Enter the search term in the visible input
    const searchInput = this.page.locator('input:visible').first();
    searchInput.fill(productName).catch(() => {});

    // Wait for results to render
    await this.page.waitForTimeout(1000);
  }
}

