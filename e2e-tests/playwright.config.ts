import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(__dirname, ".env");
console.log(`Loading environment from: ${envPath}`);
dotenv.config({ path: envPath });

console.log(`Using BASE_URL: ${process.env.BASE_URL}`);

const authFile = path.join(__dirname, "playwright/.auth/user.json");

const mobileDevice = devices["iPhone 14"];
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  globalSetup: require.resolve("./global-setup"),
  fullyParallel: false,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
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
    storageState: authFile,
  },
  projects: [
    {
      name: "setup",
      testMatch: /auth-setup\.spec\.ts/,
      use: { storageState: undefined },
    },
    {
      name: "chromium-mobile",
      testIgnore: /auth-setup\.spec\.ts/,
      use: {
        ...devices["Pixel 7"],
      },
      dependencies: ["setup"],
    },
    ...(!isCI
      ? [
          {
            name: "webkit-mobile",
            testIgnore: /auth-setup\.spec\.ts/,
            use: {
              ...devices["iPhone 14"],
            },
            dependencies: ["setup"],
          },
        ]
      : []),
    {
      name: "public",
      testDir: "./tests/public",
      use: {
        ...devices["Pixel 7"],
        storageState: undefined,
      },
    },
  ],
});
