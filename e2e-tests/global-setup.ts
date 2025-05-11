import { chromium, FullConfig } from "@playwright/test";
import path from "path";
import fs from "fs";

// Файл, в котором будет храниться состояние авторизации
const authFile = path.join(__dirname, "playwright/.auth/user.json");
const AUTH_FILE_TTL = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах

// Проверяем, запущены ли тесты в CI среде
const isCI = process.env.CI === "true";

async function globalSetup(config: FullConfig) {
  console.log("🔧 Запуск глобальной настройки авторизации");
  console.log(`🌐 Режим запуска: ${isCI ? "CI/CD" : "локальный"}`);

  const authDir = path.join(__dirname, "playwright/.auth");

  // Создаем директорию, если она не существует
  if (!fs.existsSync(authDir)) {
    try {
      fs.mkdirSync(authDir, { recursive: true });
      console.log(`✅ Создана директория: ${authDir}`);
    } catch (error) {
      console.error(`❌ Ошибка при создании директории ${authDir}:`, error);

      // В CI среде пробуем создать с другими правами
      if (isCI) {
        try {
          console.log("🔄 Пробуем создать директорию с sudo в CI...");
          require("child_process").execSync(
            `mkdir -p ${authDir} && chmod -R 777 ${authDir}`
          );
          console.log(`✅ Директория создана через выполнение команды`);
        } catch (cmdError) {
          console.error(
            "❌ Не удалось создать директорию даже через команду:",
            cmdError
          );
        }
      }
    }
  }

  // Проверяем существующий файл авторизации и его актуальность
  if (fs.existsSync(authFile)) {
    const stats = fs.statSync(authFile);
    const fileAge = Date.now() - stats.mtimeMs;

    // Если файл существует и не старше 24 часов, пропускаем авторизацию
    if (fileAge < AUTH_FILE_TTL) {
      console.log(
        `✅ Найден актуальный файл авторизации (${Math.round(
          fileAge / 60000
        )} минут)`
      );
      return;
    } else {
      console.log(
        `⚠️ Файл авторизации устарел (${Math.round(
          fileAge / 60000
        )} минут), требуется обновление`
      );
    }
  } else {
    console.log("ℹ️ Файл авторизации не найден, выполняем авторизацию");
  }

  // Проверяем переменные окружения
  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;
  const baseUrl = process.env.BASE_URL || "https://sila-danila.ru";

  // Выводим отладочную информацию
  console.log(`🌐 Базовый URL: ${baseUrl}`);
  console.log(`📧 TEST_EMAIL установлен: ${email ? "Да" : "НЕТ"}`);
  console.log(`🔑 TEST_PASSWORD установлен: ${password ? "Да" : "НЕТ"}`);

  // Показываем все переменные окружения в CI (без значений)
  if (isCI) {
    console.log("🔍 Доступные переменные окружения в CI:");
    Object.keys(process.env).forEach((key) => {
      if (
        !key.includes("PASSWORD") &&
        !key.includes("TOKEN") &&
        !key.includes("SECRET")
      ) {
        console.log(
          `   - ${key}: ${key.includes("EMAIL") ? "***" : process.env[key]}`
        );
      } else {
        console.log(`   - ${key}: ***`);
      }
    });
  }

  if (!email || !password) {
    console.error("❌ TEST_EMAIL или TEST_PASSWORD не установлены в .env");
    if (isCI) {
      console.error(
        "⚠️ В CI среде проверьте, что секреты настроены правильно в GitHub Repository Settings"
      );
    }
    return;
  }

  console.log(`🔑 Запуск авторизации для пользователя: ${email}`);

  // Максимальное количество попыток авторизации
  const maxRetries = 3;
  let attempt = 0;
  let success = false;

  while (attempt < maxRetries && !success) {
    attempt++;
    console.log(`🔄 Попытка авторизации ${attempt}/${maxRetries}`);

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      // Авторизация
      const loginUrl = `${baseUrl}/auth/login`;
      console.log(`📱 Открываем страницу авторизации: ${loginUrl}`);
      await page.goto(loginUrl, { timeout: 30000 });
      await page.waitForLoadState("networkidle");

      // В CI делаем скриншот для отладки
      if (isCI) {
        const screenshotPath = path.join(__dirname, "login-page.png");
        await page.screenshot({ path: screenshotPath });
        console.log(`📸 Сделан скриншот страницы логина: ${screenshotPath}`);
      }

      await page.getByRole("textbox", { name: "Email" }).fill(email);
      await page.getByRole("textbox", { name: "Password" }).fill(password);
      await page.getByRole("button", { name: "Login" }).click();

      // Проверка успешной авторизации
      await page.waitForSelector("text=You have successfully logged", {
        timeout: 10000,
      });

      // Сохранение состояния
      await context.storageState({ path: authFile });

      if (fs.existsSync(authFile)) {
        const size = fs.statSync(authFile).size;
        console.log(
          `✅ Авторизация успешна! Сохранено состояние (${size} байт)`
        );

        if (isCI) {
          console.log(`📂 Путь к файлу авторизации: ${authFile}`);

          // Устанавливаем права для CI
          try {
            fs.chmodSync(authFile, 0o666);
            console.log("✅ Установлены права доступа для файла авторизации");
          } catch (chmodErr) {
            console.error("⚠️ Не удалось установить права на файл:", chmodErr);
          }
        }

        success = true;
      } else {
        throw new Error("Файл состояния не был создан");
      }
    } catch (error) {
      console.error(`❌ Ошибка при попытке ${attempt}:`, error);
      if (attempt === maxRetries) {
        console.error("⛔ Все попытки авторизации исчерпаны");
      }
    } finally {
      await browser.close();
    }
  }

  if (!success) {
    console.error("⛔ Не удалось выполнить авторизацию");
  }
}

export default globalSetup;
