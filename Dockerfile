# Dockefile based on https://github.com/keinsell/neuronek/blob/ae130c36e32b7bc1390e9063fc93d5fd92349b96/apps/server/Dockerfile

FROM node:alpine AS install

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Install build packages for native node modules
RUN apk update && apk add --update \
  python3 \
  make \
  g++

WORKDIR /app

# Copy files necessary for install
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY prisma prisma

# Install dependencies
RUN yarn

# Copy all files
COPY . .

# Build
RUN yarn build

FROM node:alpine AS run

LABEL org.opencontainers.image.source=https://github.com/keinsell/bikeramp
LABEL org.opencontainers.image.description="🚲 Imagine you are a bike courier and you want to build a system that will help you track your rides during delivery of packages: how many kilometers did you ride on each day and how much did customer pay for delivery. The app will help you to control your work."
LABEL org.opencontainers.image.licenses=MIT

EXPOSE 3000

# Add user with limited permissions
RUN addgroup --system --gid 1001 runner
RUN adduser --system --uid 1001 runner

# Use user with limited permissions
USER runner

# Copy bundle and start application
COPY --from=install /app/node_modules ./node_modules
COPY --from=install /app/package*.json ./
COPY --from=install /app/dist ./dist
COPY --from=install /app/prisma ./prisma

CMD [ "node", "dist/src/main.js" ]
