# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm run build

# Stage 2: Run the application for production
FROM node:20-alpine AS runner

RUN apk add --no-cache curl
ENV NODE_ENV production
ENV PORT 3000

WORKDIR /app

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000

CMD ["npm", "start"]
