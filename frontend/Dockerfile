FROM node:20-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

ARG GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm run build

FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --prod

EXPOSE 3000

CMD ["pnpm", "start"]
