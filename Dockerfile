FROM golang:1.24.2-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY backend/ ./backend/
RUN go build -ldflags "-s -w" -o app ./backend

FROM alpine:3.21.3
WORKDIR /app
RUN apk add --no-cache ca-certificates
COPY --from=builder /app/app .
COPY frontend/ ./frontend/
EXPOSE 8080/tcp
CMD ["./app"]