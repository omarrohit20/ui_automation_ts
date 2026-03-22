import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { HomePage } from '../pages/HomePage';

test.describe('Juice Shop - Accessibility - Home', () => {
  test('has no serious or critical accessibility violations', async ({ page }) => {
    const home = new HomePage(page);

    await home.open();
    await home.dismissWelcomeIfPresent();

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .withRules({
        // example: you can tune rules if needed
      })
      .analyze();

    const seriousOrHigher = results.violations.filter((v) =>
      ['serious', 'critical'].includes(v.impact || '')
    );

    if (seriousOrHigher.length > 0) {
      // Log details to help triage
      // eslint-disable-next-line no-console
      console.log(
        'Accessibility violations:',
        seriousOrHigher.map((v) => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          nodes: v.nodes.length,
        }))
      );
    }

    expect(seriousOrHigher, 'Serious/critical accessibility violations').toHaveLength(0);
  });
});

