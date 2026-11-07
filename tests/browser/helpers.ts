import type { Page } from "@playwright/test";

export const testDetails = {
  number: "4111 1111 1111 1111",
  expiry: "12/29",
  holder: "Alex Morgan",
};

export async function fillDetails(page: Page): Promise<void> {
  for (const [field, value] of Object.entries(testDetails))
    await page.locator(`#card-${field}`).fill(value);
}
