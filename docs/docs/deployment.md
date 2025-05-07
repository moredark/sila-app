# Деплой

Sila-App поддерживает простой деплой с использованием Docker и Docker Compose.

## Требования к серверу

- Linux-сервер с установленным Docker и Docker Compose
- Доменное имя, направленное на IP-адрес вашего сервера
- Открытые порты 80 и 443

## Процесс деплоя

1. **Клонируйте репозиторий на сервер**

   ```
   git clone https://github.com/your_username/sila-app.git
   cd sila-app
   ```

2. **Настройте переменные окружения**

   ```
   cp .env.example .env
   nano .env
   ```

3. **Запустите приложение**

   ```
   docker-compose -f docker-compose.prod.yml up -d
   ```

## SSL-сертификаты

Certbot необходим для обеспечения безопасности приложения с помощью SSL-сертификатов от Let's Encrypt. Он автоматизирует получение, продление и управление сертификатами, чтобы ваше приложение всегда оставалось защищённым без ручного вмешательства.

### Настройка Certbot

```
docker-compose -f docker-compose.prod.yml run --rm certbot certonly --webroot --webroot-path=/var/www/certbot -d yourdomain.com -d www.yourdomain.com
```

### Автоматическое обновление сертификатов

```
docker-compose -f docker-compose.prod.yml run --rm certbot renew
``` 