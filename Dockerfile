# Stage 0
FROM node:20-slim as base
LABEL maintainer="Nghiep <me@nghiep.dev>"
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@8 --activate

ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app
COPY .npmrc package.json pnpm-lock.yaml pnpm-workspace.yaml cache-handler.mjs next.config.mjs ./


# State 1
FROM base as deps
COPY packages ./packages
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --production

# Stage 2
FROM base as builder
COPY packages ./packages
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .
ENV NODE_ENV production
RUN pnpm build


# Stage 3
FROM keymetrics/pm2:latest-slim as runner
ARG NEXT_PUBLIC_VERSION
ENV NEXT_PUBLIC_VERSION $NEXT_PUBLIC_VERSION
ENV NODE_ENV production
ENV PORT 3000
COPY --from=builder .npmrc package.json cache-handler.mjs next.config.mjs pm2.json ./
COPY --from=builder /app/.env* ./
COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
COPY --from=deps /app/node_modules ./node_modules
EXPOSE $PORT
CMD ["pm2-runtime", "start", "pm2.json"]