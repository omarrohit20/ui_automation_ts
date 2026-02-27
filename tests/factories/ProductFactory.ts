import type { Product } from '../domain/models';

export class ProductFactory {
  static appleJuice(quantity = 1): Product {
    return { name: 'Apple Juice (1000ml)', quantity };
  }

  static bananaJuice(quantity = 1): Product {
    return { name: 'Banana Juice (1000ml)', quantity };
  }
}

