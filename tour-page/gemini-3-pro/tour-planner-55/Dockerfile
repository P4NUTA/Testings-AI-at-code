# Server
FROM node:18-alpine as server
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ .

# Client
FROM node:18-alpine as client
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# Final Production Image (Serving Client via Express)
FROM node:18-alpine
WORKDIR /app
COPY --from=server /app/server ./server
COPY --from=client /app/client/dist ./client/dist
WORKDIR /app/server
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "index.js"]
