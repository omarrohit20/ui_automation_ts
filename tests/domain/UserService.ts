import type { Page } from '@playwright/test';
import { AuthFlow } from '../flows/AuthFlow';
import { RegistrationFlow } from '../flows/RegistrationFlow';
import type { User } from './models';

/**
 * Domain-level service that exposes use-cases for users
 * (register, login) on top of lower-level flows/pages.
 */
export class UserService {
  private readonly authFlow: AuthFlow;
  private readonly registrationFlow: RegistrationFlow;

  constructor(private readonly page: Page) {
    this.authFlow = new AuthFlow(page);
    this.registrationFlow = new RegistrationFlow(page);
  }

  async register(user: User) {
    await this.registrationFlow.registerUser(user);
  }

  async login(user: User) {
    await this.authFlow.loginAs(user.email, user.password);
  }
}

