FROM golang:1.24.2-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod tidy
COPY . .
RUN go build -o app .

FROM alpine:3.21.3
WORKDIR /app
COPY --from=builder /app/app .
COPY public/ ./public/
COPY assets/ ./assets/
COPY views/ ./views/
COPY locales/ ./locales/
EXPOSE 8080/tcp
CMD ["./app"]