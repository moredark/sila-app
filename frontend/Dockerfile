FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

ARG GOOGLE_CLIENT_ID

ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]
