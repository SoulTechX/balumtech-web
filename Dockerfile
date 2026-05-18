# ─── STAGE 1: Instalar dependencias ───
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline

# ─── STAGE 2: Buildear la app ───
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js telemetry off
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ─── STAGE 3: Producción ───
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copiar solo lo necesario para correr
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copiar datos iniciales (el volumen de EasyPanel sobreescribe esto)
COPY --from=builder /app/data ./data

EXPOSE 3000

CMD ["node", "server.js"]
