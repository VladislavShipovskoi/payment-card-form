import { expect, test } from '@playwright/test';

test('loads the playground without browser errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cardform playground');
  expect(errors).toEqual([]);
});
