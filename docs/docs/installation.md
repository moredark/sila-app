# Установка

## Необходимое ПО

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)

## Шаги установки

1. **Клонируйте репозиторий**

   ```
   git clone https://github.com/your_username/sila-app.git
   cd sila-app
   ```

2. **Создайте переменные окружения**

   Скопируйте пример и заполните своими значениями:

   ```
   cp .env.example .env
   ```

   Отредактируйте файл .env и укажите необходимые переменные:

   ```
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   JWT_SECRET_KEY=your_jwt_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   REDIRECT_URL=https://yourdomain.com/api/auth/google/callback
   ```

3. **Соберите и запустите контейнеры Docker**

   ```
   docker-compose up -d
   ``` 