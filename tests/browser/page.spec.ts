import { expect, test } from '@playwright/test';

test('loads the playground without browser errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Card details, considered.');
  expect(errors).toEqual([]);
});

test('provides native card fields with labels and autocomplete', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('contentinfo')).toBeVisible();
  const fields = [
    ['Card number', 'cc-number'], ['Expiry date', 'cc-exp'],
    ['Security code', 'cc-csc'], ['Cardholder name', 'cc-name'],
  ] as const;
  for (const [name, autocomplete] of fields) {
    const input = page.getByLabel(new RegExp(`^${name}`));
    await expect(input).toHaveAttribute('autocomplete', autocomplete);
    await expect(input).toHaveAttribute('required', '');
  }
  await expect(page.locator('#card-cvv')).toHaveAttribute('type', 'password');
  await expect(page.locator('#card-cvv')).toHaveAccessibleDescription('The 3 or 4 digit code on your card.');
  await expect(page.locator('#card-expiry')).toHaveAccessibleDescription('Month and year: MM/YY');
  await expect(page.locator('[data-ui="preview"]')).toHaveAttribute('aria-hidden', 'true');
});

test('preserves native input and prevents form navigation', async ({ page }) => {
  await page.goto('/');
  await page.locator('#card-number').fill('dsfsdfdsfdsf2202206271714979');
  await expect(page.locator('#card-number')).toHaveValue('dsfsdfdsfdsf2202206271714979');
  await page.locator('#card-holder').fill('  李   Иванов  ');
  const url = page.url();
  await page.getByRole('button', { name: 'Try the form' }).click();
  await expect(page).toHaveURL(url);
  await expect(page.locator('#card-holder')).toHaveValue('  李   Иванов  ');
  await expect(page.locator('[data-ui="preview"]')).not.toContainText('Иванов');
});

for (const width of [320, 375, 768, 1280]) {
  test(`fits a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for (const id of ['card-number', 'card-expiry', 'card-cvv', 'card-holder']) {
      const input = page.locator(`#${id}`);
      await expect(input).toBeVisible();
      const bounds = await input.boundingBox();
      expect(bounds!.width).toBeGreaterThan(100);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    }
  });
}
