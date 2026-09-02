FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install --no-audit --no-fund

FROM base AS build
COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/ || exit 1

FROM base AS api
COPY . .
RUN npx tsc -p server/tsconfig.json
ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "server-dist/index.js"]
