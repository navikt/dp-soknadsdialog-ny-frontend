import { test, expect } from "@playwright/test";

test("Has `Ny søknadsdialog frontend` as page title", async ({ page, baseURL }) => {
  await page.goto(baseURL!);
  await expect(page).toHaveTitle(/Ny søknadsdialog frontend/);
});
