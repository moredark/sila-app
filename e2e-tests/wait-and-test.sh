#!/bin/sh

FRONTEND_URL=${BASE_URL:-http://frontend:3000}

echo "Waiting for frontend to be ready at $FRONTEND_URL..."

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

MAX_WAIT=120
WAIT_COUNT=0

until [ "$(check_frontend)" -ge "200" ]; do
  WAIT_COUNT=$((WAIT_COUNT+1))
  
  if [ "$WAIT_COUNT" -ge "$MAX_WAIT" ]; then
    echo "Frontend did not become available within $MAX_WAIT seconds. Exiting."
    exit 1
  fi
  
  echo "Waiting for frontend to be available... ($WAIT_COUNT/$MAX_WAIT)"
  sleep 1
done

echo "Frontend is responding. Checking if page is fully loaded..."

WAIT_COUNT=0
until check_frontend_content; do
  WAIT_COUNT=$((WAIT_COUNT+1))
  
  if [ "$WAIT_COUNT" -ge "30" ]; then
    echo "Frontend page did not fully load within 30 seconds. Continuing anyway..."
    break
  fi
  
  echo "Waiting for frontend page to fully load... ($WAIT_COUNT/30)"
  sleep 1
done

echo "Frontend is available. Starting tests..."

npm test

TEST_EXIT_CODE=$?

if [ -d "./playwright-report" ]; then
  echo "Tests completed. Report generated in /app/playwright-report"
fi

exit $TEST_EXIT_CODE 