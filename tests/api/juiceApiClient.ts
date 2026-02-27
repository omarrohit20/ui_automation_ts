import type { APIResponse } from '@playwright/test';
import { envConfig } from '../config/env';

export class JuiceApiClient {
  private readonly baseUrl = envConfig.baseUrl;

  constructor(private readonly request: (url: string, init?: RequestInit) => Promise<APIResponse>) {}

  async getProducts() {
    const response = await this.request(`${this.baseUrl}/rest/products`);
    await this.ensureOk(response);
    const body = await response.json();
    this.validateProducts(body);
    return body;
  }

  private async ensureOk(response: APIResponse) {
    if (!response.ok()) {
      throw new Error(`API request failed with status ${response.status()}`);
    }
  }

  // Simple runtime validation for API response shape
  private validateProducts(body: unknown): asserts body is { data: unknown[] } {
    if (
      typeof body !== 'object' ||
      body === null ||
      !('data' in body) ||
      !Array.isArray((body as any).data)
    ) {
      throw new Error('Invalid products response shape');
    }
  }
}

