import { Page, expect } from "@playwright/test";

/**
 * Wait for page navigation to complete
 */
export async function waitForNavigation(page: Page): Promise<void> {
  await page.waitForLoadState("networkidle");
}

/**
 * Login helper function
 */
export async function login(
  page: Page,
  username: string,
  password: string
): Promise<void> {
  await page.goto("/login");
  await page.fill('[data-testid="username"]', username);
  await page.fill('[data-testid="password"]', password);
  await page.click('[data-testid="login-button"]');
  await waitForNavigation(page);
}

/**
 * Check if element is visible with custom timeout
 */
export async function isElementVisible(
  page: Page,
  selector: string,
  timeout = 5000
): Promise<boolean> {
  try {
    await page.waitForSelector(selector, { state: "visible", timeout });
    return true;
  } catch (e) {
    return false;
  }
}
