FROM node:alpine AS builder

# Create app directory
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

RUN yarn

COPY . .

RUN yarn build

FROM node:alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD [ "node", "dist/main.js" ]