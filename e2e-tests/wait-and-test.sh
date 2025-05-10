#!/bin/sh

FRONTEND_URL=${BASE_URL:-http://frontend:3000}

echo "Waiting for frontend to be ready at $FRONTEND_URL..."

check_frontend() {
  curl -s -o /dev/null -w "%{http_code}" $FRONTEND_URL || echo "000"
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

echo "Frontend is available. Starting tests..."

npm test

TEST_EXIT_CODE=$?

if [ -d "./playwright-report" ]; then
  echo "Tests completed. Report generated in /app/playwright-report"
fi

exit $TEST_EXIT_CODE 