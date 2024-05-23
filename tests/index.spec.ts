import { test, expect } from "@playwright/test";

test("Has `Ny dagpenger søknad frontend` as page title", async ({ page, baseURL }) => {
  await page.goto(baseURL!);
  await expect(page).toHaveTitle(/Ny dagpenger søknad frontend/);
});
