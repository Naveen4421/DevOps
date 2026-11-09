# Multi-stage production Dockerfile for NexOps Portal (SIET Tumakuru)
# Stage 1: Base image
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl

# Stage 2: Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 3: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV DATABASE_URL="file:./dev.db"

# Generate Prisma Client for the production container with musl OpenSSL 3.0.x engine
RUN npx prisma generate

RUN npm run build

# Stage 4: Production runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV DATABASE_URL="file:./dev.db"

# Create a non-root system user and group for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy static assets, standalone bundle, and Prisma schema
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
