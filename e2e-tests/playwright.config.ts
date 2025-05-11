import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(__dirname, ".env");
console.log(`Loading environment from: ${envPath}`);
dotenv.config({ path: envPath });

console.log(
  `Using BASE_URL: ${process.env.BASE_URL}`
);

const mobileDevice = devices["iPhone 14"];

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    viewport: mobileDevice.viewport,
    deviceScaleFactor: mobileDevice.deviceScaleFactor,
    isMobile: true,
    hasTouch: true,
    userAgent: mobileDevice.userAgent,
  },
  projects: [
    {
      name: "chromium-mobile",
      use: {
        ...devices["Pixel 5"],
      },
    },
    {
      name: "webkit-mobile",
      use: {
        ...devices["iPhone 14"],
      },
    },
  ],
});
