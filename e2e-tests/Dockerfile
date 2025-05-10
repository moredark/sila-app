FROM mcr.microsoft.com/playwright:v1.37.0-focal

WORKDIR /app

RUN apt-get update && apt-get install -y curl && apt-get clean

COPY package*.json ./

RUN npm install

COPY . .

RUN npx playwright install --with-deps chromium webkit

RUN chmod +x wait-and-test.sh

CMD ["./wait-and-test.sh"] 