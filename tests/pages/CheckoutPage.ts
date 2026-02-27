import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import type { Address, PaymentCard } from '../domain/models';

export class CheckoutPage extends BasePage {
  protected readonly path = '/#/address/select';

  constructor(page: Page) {
    super(page);
  }

  async completeCheckoutFlow(address: Address, card: PaymentCard) {
    // Address selection
    await this.page.getByRole('button', { name: 'Add New Address' }).click();
    await this.page.fill(
      'input[placeholder="Please provide a country."]',
      address.country
    );
    await this.page.fill(
      'input[placeholder="Please provide a name."]',
      address.name
    );
    await this.page.fill(
      'input[placeholder="Please provide a mobile number."]',
      address.mobileNumber
    );
    await this.page.fill(
      'input[placeholder="Please provide a ZIP code."]',
      address.zipCode
    );
    await this.page.fill(
      'textarea[placeholder="Please provide an address."]',
      address.addressLine
    );
    await this.page.fill(
      'input[placeholder="Please provide a city."]',
      address.city
    );
    await this.page.fill(
      'input[placeholder="Please provide a state."]',
      address.state
    );
    await this.page.getByRole('button', { name: 'Submit' }).click();

    await this.page.getByRole('button', { name: 'Continue' }).click();

    // Delivery method
    await this.page.getByRole('radio').first().check();
    await this.page.getByRole('button', { name: 'Continue' }).click();

    // Payment
    await this.page.getByRole('button', { name: 'Add New Card' }).click();
    await this.page.fill(
      'input[placeholder="Please provide a name."]',
      card.name
    );
    await this.page.fill(
      'input[placeholder="Please provide a card number."]',
      card.number
    );
    await this.page.fill(
      'input[placeholder="Please provide a card CVC."]',
      card.cvc
    );
    await this.page
      .getByRole('combobox')
      .first()
      .selectOption({ index: card.expiryMonthIndex });
    await this.page
      .getByRole('combobox')
      .nth(1)
      .selectOption({ index: card.expiryYearIndex });
    await this.page.getByRole('button', { name: 'Submit' }).click();

    await this.page.getByRole('button', { name: 'Continue' }).click();

    // Place order
    await this.page
      .getByRole('button', { name: 'Place your order and pay' })
      .click();
  }
}


