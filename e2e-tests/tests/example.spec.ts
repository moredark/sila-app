import { test, expect } from "@playwright/test";

test("mobile view - has title", async ({ page }) => {
  await page.goto("/");

  const viewport = page.viewportSize();
  console.log(`Current viewport: ${viewport?.width}x${viewport?.height}`);

  await expect(page).toHaveTitle(/Sila/);
});