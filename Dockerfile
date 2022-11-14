### Dependencies:
FROM node:16-alpine AS dependencies
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --only=production && npm cache clean --force

### Build:
FROM node:16-alpine AS builder
WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npm run build

### Production:
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nestjs:nodejs /app/dist ./
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules

USER nestjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "main.js"]
