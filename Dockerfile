FROM golang:1.24.2-alpine AS builder
WORKDIR /src
COPY go.mod go.sum /src/
RUN go mod download
COPY . .
RUN go build -ldflags "-s -w" -o app .

FROM scratch
WORKDIR /src
COPY --from=builder . .
EXPOSE 8080/tcp
ENTRYPOINT ["/src/app"]