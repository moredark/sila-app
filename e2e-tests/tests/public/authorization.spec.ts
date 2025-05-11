import { test, expect } from "@playwright/test";

test("Authorization", async ({ page }) => {
  await page.context().clearCookies();
  await page.goto("/auth/login");

  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;

  if (!email || !password) {
    throw new Error("TEST_EMAIL or TEST_PASSWORD is not set");
  }

  await page.getByRole("textbox", { name: "Email" }).fill(email);
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("You have successfully logged")).toBeVisible();
});
