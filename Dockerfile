FROM oven/bun:1.2-alpine AS base
WORKDIR /app

FROM base AS install
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

FROM base AS release
COPY --from=install /app/node_modules node_modules
COPY . .

USER bun
EXPOSE 8080/tcp
ENTRYPOINT ["bun", "app.ts"]