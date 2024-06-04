import { test, expect } from "@playwright/test";

test("Has `Søknad om dagpenger - Start søknad` as page title", async ({ page, baseURL }) => {
  await page.goto(baseURL!);
  await expect(page).toHaveTitle(/Søknad om dagpenger - Start søknad/);
});
