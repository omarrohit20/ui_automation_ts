import type { Address, PaymentCard } from '../domain/models';

export interface CheckoutData {
  address: Address;
  card: PaymentCard;
}

export class CheckoutDataFactory {
  static default(): CheckoutData {
    return {
      address: {
        country: 'Testland',
        name: 'Test User',
        mobileNumber: '1234567890',
        zipCode: '12345',
        addressLine: '1 Test Street',
        city: 'Test City',
        state: 'Test State',
      },
      card: {
        name: 'Test User',
        number: '4111111111111111',
        cvc: '123',
        expiryMonthIndex: 1,
        expiryYearIndex: 1,
      },
    };
  }
}

