import { test, expect } from '@playwright/test';
import { JuiceApiClient } from './juiceApiClient';

test.describe('Juice Shop API - Products', () => {
  test('returns a valid product list', async ({ request }) => {
    const client = new JuiceApiClient((url, init) => request.fetch(url, init));

    const result = await client.getProducts();

    expect(Array.isArray(result.data)).toBeTruthy();
    expect(result.data.length).toBeGreaterThan(0);
  });
});

