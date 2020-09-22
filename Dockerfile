# syntax = docker/dockerfile:1.0-experimental
# (required for mounting secrets)

# Build stage
FROM node:12-slim AS build
WORKDIR /usr/src/app

# Install all dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Build application code
COPY . .
RUN --mount=type=secret,id=dotenv,target=/usr/src/app/.env npm run build

# Remove `devDependencies`
RUN npm install --only=production

# Runtime stage
FROM node:12-slim AS runtime
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/server server
COPY --from=build /usr/src/app/priceParts priceParts
COPY --from=build /usr/src/app/.nuxt .nuxt
COPY --from=build /usr/src/app/node_modules node_modules
COPY --from=build /usr/src/app/nuxt.config.js nuxt.config.js
COPY --from=build /usr/src/app/static static

# Required for logo in emails
COPY --from=build /usr/src/app/assets/img/icons/Logo-new-1000.png assets/img/icons/Logo-new-1000.png

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server/index.js"]
