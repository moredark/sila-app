   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY . .
   RUN npm ci && npm run build

   FROM nginx:alpine
   COPY --from=builder /app/build /usr/share/nginx/html
   EXPOSE 80