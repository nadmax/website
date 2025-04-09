FROM golang:1.24.2-alpine AS builder
WORKDIR /src
COPY go.mod go.sum /src/
RUN go mod download
COPY . .
RUN go build -ldflags "-s -w" -o app .

FROM scratch
WORKDIR /src
COPY --from=builder /src/app .
COPY locales/ ./locales/
COPY utils/ ./utils/
COPY routes/ ./routes/
COPY middleware/ ./middleware/
EXPOSE 8080/tcp
ENTRYPOINT ["/src/app"]