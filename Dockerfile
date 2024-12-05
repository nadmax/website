FROM golang:1.23
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY scripts ./scripts
COPY assets ./assets
COPY index.html .
COPY server.go .
RUN go build -v -o build/ ./...

EXPOSE 3000

CMD ["build/website"]