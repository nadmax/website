FROM golang:1.24.2-alpine AS builder
WORKDIR /src
COPY go.mod go.sum /src/
RUN go mod download
COPY . .
RUN go build -ldflags "-s -w" -o app .

FROM scratch
WORKDIR /src
COPY --from=builder /src/app .
COPY public/ ./public/
COPY assets/ ./assets/
COPY views/ ./views/
COPY locales/ ./locales/
COPY utils/ ./utils/
COPY scripts/ ./scripts/
COPY routes/ ./routes/
COPY middleware/ ./middleware/
EXPOSE 8080/tcp
ENTRYPOINT ["/src/app"]