FROM golang:1.21 AS builder

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main .

FROM alpine:latest

RUN apk --no-cache add ca-certificates

COPY --from=builder /app/main /app/main

COPY .env /app/.env

WORKDIR /app

CMD ["./main"]
