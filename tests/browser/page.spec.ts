import { expect, test } from "@playwright/test";

test("loads the playground without browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Card details, considered.",
  );
  expect(errors).toEqual([]);
});

test("provides native card fields with labels and autocomplete", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
  const fields = [
    ["Card number", "cc-number"],
    ["Expiry date", "cc-exp"],
    ["Cardholder name", "cc-name"],
  ] as const;
  for (const [name, autocomplete] of fields) {
    const input = page.getByLabel(new RegExp(`^${name}`));
    await expect(input).toHaveAttribute("autocomplete", autocomplete);
    await expect(input).toHaveAttribute("required", "");
  }
  await expect(page.locator("#card-expiry")).toHaveAccessibleDescription(
    "Month and year: MM/YY",
  );
  await expect(page.locator("#card-cvv")).toBeHidden();
  await page.getByRole("button", { name: "Continue to security code" }).click();
  await expect(page.getByLabel(/^Security code/)).toHaveAttribute(
    "autocomplete",
    "cc-csc",
  );
  await expect(page.locator("#card-cvv")).toHaveAttribute("type", "password");
  await expect(page.locator("#card-cvv")).toHaveAccessibleDescription(
    "The 3 or 4 digit code on your card.",
  );
  await expect(page.locator('[data-ui="preview"]')).toHaveAttribute(
    "aria-hidden",
    "true",
  );
});

test("preserves native input and prevents form navigation", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#card-number").fill("dsfsdfdsfdsf2202206271714979");
  await expect(page.locator("#card-number")).toHaveValue(
    "dsfsdfdsfdsf2202206271714979",
  );
  await page.locator("#card-holder").fill("  李   Иванов  ");
  const url = page.url();
  await page.getByRole("button", { name: "Continue to security code" }).click();
  await page.locator("#card-cvv").fill("123");
  await page.getByRole("button", { name: "Try the form" }).click();
  await expect(page).toHaveURL(url);
  await page.getByRole("button", { name: "Back to details" }).click();
  await expect(page.locator("#card-holder")).toHaveValue("  李   Иванов  ");
  await expect(page.locator('[data-ui="preview"]')).not.toContainText("Иванов");
});

for (const width of [320, 375, 768, 1280]) {
  test(`fits a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    for (const id of ["card-number", "card-expiry", "card-holder"]) {
      const input = page.locator(`#${id}`);
      await expect(input).toBeVisible();
      const bounds = await input.boundingBox();
      expect(bounds!.width).toBeGreaterThan(100);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    }
    await page
      .getByRole("button", { name: "Continue to security code" })
      .click();
    await expect(page.locator("#card-cvv")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}

test("reveals CVV after continuing and preserves values when returning", async ({
  page,
}) => {
  await page.goto("/");
  const preview = page.locator("#card-preview");
  await expect(preview).toHaveAttribute("data-side", "front");
  await expect(page.getByLabel(/^Security code/)).toBeHidden();
  await page.locator("#card-number").fill("4111 1111 1111 1111");
  await page.locator("#card-expiry").fill("12/29");
  await page.locator("#card-holder").fill("Alex Morgan");
  await page.locator("#card-holder").press("Enter");
  await expect(preview).toHaveAttribute("data-side", "back");
  await expect(page.locator("#card-cvv")).toBeFocused();
  await expect(page.locator("#details-step")).toBeHidden();
  await page.locator("#card-cvv").fill("123");
  await expect(page.locator('[data-ui="signature"]')).toHaveText("•••");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Back to details" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(preview).toHaveAttribute("data-side", "front");
  await expect(page.locator("#card-number")).toBeFocused();
  await expect(page.locator("#card-number")).toHaveValue("4111 1111 1111 1111");
  await expect(page.locator("#card-expiry")).toHaveValue("12/29");
  await expect(page.locator("#card-holder")).toHaveValue("Alex Morgan");
  await page.getByRole("button", { name: "Continue to security code" }).click();
  await expect(page.locator("#card-cvv")).toHaveValue("123");
});

test("uses an always-passing temporary gate and respects reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Continue to security code" }).click();
  await expect(page.locator("#card-cvv")).toBeFocused();
  await expect(page.locator("#card-preview")).toHaveCSS(
    "transition-duration",
    "0s",
  );
});
