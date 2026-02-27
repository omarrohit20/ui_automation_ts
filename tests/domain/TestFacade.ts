import type { Page } from '@playwright/test';
import { UserService } from './UserService';
import { ShoppingService } from './ShoppingService';

/**
 * High-level facade exposing key business flows for tests.
 */
export class TestFacade {
  readonly users: UserService;
  readonly shopping: ShoppingService;

  constructor(page: Page) {
    this.users = new UserService(page);
    this.shopping = new ShoppingService(page);
  }
}

