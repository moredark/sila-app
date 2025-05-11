#!/bin/sh

FRONTEND_URL=${BASE_URL:-https://sila-danila.ru}

echo "Тестирование сайта: $FRONTEND_URL"

check_frontend() {
  curl -s -o /dev/null -w "%{http_code}" $FRONTEND_URL || echo "000"
}

check_frontend_content() {
  status_code=$(curl -s -o /dev/null -w "%{http_code}" $FRONTEND_URL || echo "000")
  
  if [ "$status_code" -eq "200" ]; then
    content=$(curl -s $FRONTEND_URL | grep -c "<html" || echo "0")
    if [ "$content" -gt "0" ]; then
      return 0
    fi
  fi
  
  return 1
}

if [ "$(check_frontend)" -lt "200" ]; then
  echo "Ошибка: Сайт $FRONTEND_URL недоступен"
  exit 1
fi

if ! check_frontend_content; then
  echo "Внимание: Сайт $FRONTEND_URL вернул неожиданный контент"
fi

echo "Сайт доступен. Запускаем тесты..."

npm test

TEST_EXIT_CODE=$?

if [ -d "./playwright-report" ]; then
  echo "Тесты завершены. Отчет создан в директории playwright-report"
fi

exit $TEST_EXIT_CODE 