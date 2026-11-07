import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import type { FieldName } from "../../demo/form-ui.js";

async function setError(
  page: Page,
  field: FieldName,
  message: string | null,
): Promise<void> {
  await page.evaluate(
    async ({ field, message }) => {
      const ui: typeof import("../../demo/form-ui.js") =
        // @ts-expect-error Vite serves this internal browser module in development.
        await import("/demo/form-ui.ts");
      ui.setFieldError(
        document.querySelector<HTMLFormElement>("#card-form")!,
        field,
        message,
      );
    },
    { field, message },
  );
}

async function setDisabled(page: Page, disabled: boolean): Promise<void> {
  await page.evaluate(async (disabled) => {
    const ui: typeof import("../../demo/form-ui.js") =
      // @ts-expect-error Vite serves this internal browser module in development.
      await import("/demo/form-ui.ts");
    ui.setDisabled(
      document.querySelector<HTMLFormElement>("#card-form")!,
      disabled,
    );
  }, disabled);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("internal presentation helpers @dev-only", () => {
  test("updates errors safely and preserves the field's existing hint", async ({
    page,
  }) => {
    const expiry = page.locator("#card-expiry");
    await expiry.focus();
    await setError(page, "expiry", "Check this test date.");
    await expect(expiry).toHaveAttribute("aria-invalid", "true");
    await expect(expiry).toHaveCSS("border-color", "rgb(180, 35, 54)");
    await expect(page.locator("#expiry-error")).toBeVisible();
    await expect(expiry).toHaveAccessibleDescription(
      "Month and year: MM/YY Check this test date.",
    );
    await expect(expiry).toBeFocused();
    await expect(page.locator("#expiry-error")).toHaveAttribute(
      "aria-live",
      "polite",
    );
    await setError(page, "expiry", "Use a different test date.");
    await expect(expiry).toHaveAttribute(
      "aria-describedby",
      "expiry-hint expiry-error",
    );
    await setError(page, "expiry", null);
    await expect(expiry).toHaveAttribute("aria-invalid", "false");
    await expect(expiry).toHaveAttribute("aria-describedby", "expiry-hint");
    await expect(page.locator("#expiry-error")).toBeEmpty();
    await setError(page, "number", '<img src="x" onerror="alert(1)">');
    await expect(page.locator("#number-error")).toHaveText(
      '<img src="x" onerror="alert(1)">',
    );
    await expect(page.locator("#number-error img")).toHaveCount(0);
    await setError(page, "number", "");
    await expect(page.locator("#card-number")).not.toHaveAttribute(
      "aria-describedby",
    );
  });

  test("disables both steps and reset, then restores native controls", async ({
    page,
  }) => {
    await page.locator("#card-number").fill("Test value");
    await setDisabled(page, true);

    for (const selector of [
      "#card-number",
      "#card-expiry",
      "#card-holder",
      "#card-cvv",
      'button[type="submit"]',
      'button[type="reset"]',
      "#back-button",
    ]) {
      const controls = page.locator(selector);
      for (const control of await controls.all())
        await expect(control).toBeDisabled();
    }

    await page
      .locator("#card-form")
      .evaluate((form: HTMLFormElement) => form.requestSubmit());
    await expect(page.locator("#card-preview")).toHaveAttribute(
      "data-side",
      "front",
    );
    await expect(page.getByRole("status")).toBeEmpty();
    await setDisabled(page, false);
    await expect(page.locator("#card-number")).toBeEnabled();
    await expect(page.locator("#card-number")).toHaveValue("Test value");
    await page
      .getByRole("button", { name: "Continue to security code" })
      .click();
    await setDisabled(page, true);
    await expect(page.locator("#card-cvv")).toBeDisabled();
    await setDisabled(page, false);
    await expect(page.locator("#card-cvv")).toBeEnabled();
    await page.getByRole("button", { name: "Back to details" }).click();
    await expect(page.locator("#card-number")).toBeFocused();
  });

  test("reset clears both steps and errors without changing disabled state", async ({
    page,
  }) => {
    await page.locator("#card-number").fill("4111111111111111");
    await page.locator("#card-expiry").fill("12/29");
    await page.locator("#card-holder").fill("Alex Morgan");
    await setError(page, "number", "Example number error.");
    await setError(page, "expiry", "Example date error.");
    await setError(page, "holder", "Example name error.");
    await page
      .getByRole("button", { name: "Continue to security code" })
      .click();
    await page.locator("#card-cvv").fill("741");
    await setError(page, "cvv", "Example code error.");
    await page.getByRole("button", { name: "Reset form" }).click();

    for (const field of ["number", "expiry", "holder", "cvv"]) {
      await expect(page.locator(`#card-${field}`)).toHaveValue("");
      await expect(page.locator(`#card-${field}`)).toHaveAttribute(
        "aria-invalid",
        "false",
      );
      await expect(page.locator(`#${field}-error`)).toBeEmpty();
    }

    await expect(page.locator("#card-expiry")).toHaveAttribute(
      "aria-describedby",
      "expiry-hint",
    );
    await expect(page.locator("#card-cvv")).toHaveAttribute(
      "aria-describedby",
      "cvv-hint",
    );
    await expect(page.locator("#card-preview")).toHaveAttribute(
      "data-side",
      "front",
    );
    await expect(page.locator("#card-number")).toBeFocused();
    await expect(page.getByRole("status")).toHaveText(
      "Form cleared. Nothing was sent.",
    );
    await setDisabled(page, true);
    await page
      .locator("#card-form")
      .evaluate((form: HTMLFormElement) => form.reset());
    await expect(page.locator("#card-number")).toBeDisabled();
    await setDisabled(page, false);
    await expect(page.locator("#card-number")).toBeEnabled();
  });
});

test("supports skip navigation, Tab, Shift+Tab and keyboard actions", async ({
  page,
}) => {
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toHaveCSS("clip-path", "inset(50%)");
  await skip.focus();
  await expect(skip).toHaveCSS("clip-path", "none");
  await expect(skip).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  for (const selector of [
    "#card-number",
    "#card-expiry",
    "#card-holder",
    '#details-step button[type="submit"]',
    'button[type="reset"]',
  ]) {
    await page.keyboard.press("Tab");
    await expect(page.locator(selector)).toBeFocused();
  }
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("button", { name: "Continue to security code" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#card-cvv")).toBeFocused();

  for (const selector of [
    "#back-button",
    '#security-step button[type="submit"]',
    'button[type="reset"]',
  ]) {
    await page.keyboard.press("Tab");
    await expect(page.locator(selector)).toBeFocused();
  }

  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toContainText(
    "validation and payments are not connected",
  );
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(page.locator("#card-number")).toBeFocused();
  expect(
    await page
      .locator('[tabindex]:not([tabindex="0"]):not([tabindex="-1"])')
      .count(),
  ).toBe(0);
});

test("announces only a demo submit and does not expose or send entered values", async ({
  page,
}) => {
  await page.locator("#card-number").fill("4111111111111111");
  await page.locator("#card-expiry").fill("12/29");
  await page.locator("#card-holder").fill("Alex Morgan");
  await page.getByRole("button", { name: "Continue to security code" }).click();
  await page.locator("#card-cvv").fill("741");
  const url = page.url();
  const requests: string[] = [];
  const logs: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  page.on("console", (message) => logs.push(message.text()));
  await page.locator("#card-cvv").press("Enter");
  await expect(page.getByRole("status")).toHaveText(
    "Demo only: validation and payments are not connected. Nothing was sent.",
  );
  await expect(page).toHaveURL(url);
  expect(requests).toEqual([]);
  const visibleText = await page.locator("body").innerText();

  for (const value of ["4111111111111111", "Alex Morgan", "741"]) {
    expect(visibleText).not.toContain(value);
    expect(logs.join("\n")).not.toContain(value);
  }

  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
    })),
  ).toEqual({ local: 0, session: 0 });
  await page.locator("#card-cvv").fill("742");
  await expect(page.getByRole("status")).toBeEmpty();
});

test("keeps the introduction stable when announcing submit and reset", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  const top = () =>
    page
      .locator('[data-ui="intro"]')
      .evaluate((el) => el.getBoundingClientRect().top + scrollY);
  const initial = await top();
  await page.getByRole("button", { name: "Continue to security code" }).click();
  await page.getByRole("button", { name: "Try the form" }).click();
  expect(await top()).toBeCloseTo(initial, 2);
  await page.getByRole("button", { name: "Reset form" }).click();
  expect(await top()).toBeCloseTo(initial, 2);
});
