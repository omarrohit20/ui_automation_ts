import type { Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';

import type { User } from './models';

/**
 * Domain-level service that exposes use-cases for users
 * (register, login) on top of lower-level flows/pages.
 */
export class UserService {
  private readonly home: HomePage;
  private readonly loginPage: LoginPage;
  private readonly registrationPage: RegistrationPage;

  constructor(private readonly page: Page) {
    this.home = new HomePage(page);
    this.loginPage = new LoginPage(page);
    this.registrationPage = new RegistrationPage(page);
  }

  async register(user: User) {
    await this.home.open();
    await this.home.dismissWelcomeIfPresent();
    await this.home.openRegistration();
    await this.registrationPage.register(user);
  }

  async login(email: string, password: string) {
    await this.home.open();
    await this.home.dismissWelcomeIfPresent();
    await this.home.goToLogin();
    await this.loginPage.login(email, password);
  }
}