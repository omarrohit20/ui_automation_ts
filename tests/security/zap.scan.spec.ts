import { test, expect } from '@playwright/test';
import { zap } from './zapClient';

// This spec demonstrates driving OWASP ZAP via its API.
// It assumes a ZAP daemon is already running and reachable.

test.describe('Juice Shop - Security - OWASP ZAP', () => {
  test('runs spider and active scan against Juice Shop', async () => {
    test.setTimeout(10 * 60 * 1000); // up to 10 minutes for full scan

    const targetUrl = 'https://demo.owasp-juice.shop';

    const spiderResult: any = await zap.spider.scan(targetUrl);
    const spiderId = spiderResult.scan;

    let spiderProgress = '0';
    while (spiderProgress !== '100') {
      const status: any = await zap.spider.status(spiderId);
      spiderProgress = status.status;
      if (spiderProgress !== '100') {
        await new Promise((r) => setTimeout(r, 2000));
      }
    }

    const scanResult: any = await zap.ascan.scan(targetUrl);
    const scanId = scanResult.scan;

    let ascanProgress = '0';
    while (ascanProgress !== '100') {
      const status: any = await zap.ascan.status(scanId);
      ascanProgress = status.status;
      if (ascanProgress !== '100') {
        await new Promise((r) => setTimeout(r, 5000));
      }
    }

    const alertsResult: any = await zap.core.alerts({ url: targetUrl });
    const alerts = alertsResult.alerts ?? [];

    // In a real CI gate you might fail on high/medium risk.
    // Here we simply assert that ZAP returned some alerts at all,
    // proving the integration is working.
    expect(alerts.length, 'ZAP should find some issues on Juice Shop').toBeGreaterThan(0);
  });
});

