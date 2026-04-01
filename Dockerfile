FROM node:20-bookworm-slim AS build

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY src/frontend/package.json src/frontend/package.json

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build:frontend

FROM node:20-bookworm-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=10000

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/server.mjs ./server.mjs
COPY --from=build /app/src/frontend/dist ./src/frontend/dist

EXPOSE 10000

CMD ["node", "server.mjs"]

