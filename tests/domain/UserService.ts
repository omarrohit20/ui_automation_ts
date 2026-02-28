import type { Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';

import { envConfig } from '../config/env';
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
    // instead of driving the UI we hit the public registration API directly.
    // this keeps our tests fast and eliminates all of the modal/pop‑up
    // instability we were seeing on the registration page while still giving
    // us a valid account for later UI actions such as login or checkout.
    const url = `${envConfig.baseUrl}/rest/user/register`;
    await this.page.request.post(url, {
      data: {
        email: user.email,
        password: user.password,
        repeatPassword: user.password,
        securityQuestion: user.securityQuestion ?? 'What is your pet’s name?',
        securityAnswer: user.securityAnswer ?? 'test',
      },
    });

    // if callers still require the app to be on a particular page after
    // registration they can navigate themselves; the old UI flow no longer
    // takes place here.
  }

  async login(email: string, password: string) {
    // go straight to the login page rather than clicking through the account
    // menu; this avoids random overlays intercepting the menu button.
    await this.loginPage.open();
    // clear any modals that might show up on the login screen
    //await this.home.dismissAllPopups();
    await this.loginPage.login(email, password);
    //await this.home.dismissWelcomeIfPresent();
  }
}