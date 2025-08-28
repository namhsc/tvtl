# Stage 1: build app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: serve static bằng "serve"
FROM node:20-alpine
WORKDIR /app
RUN npm i -g serve
ARG BUILD_DIR=build          # Vite: dist
ENV PUBLIC_DIR=/app/${BUILD_DIR}
COPY --from=builder /app/${BUILD_DIR} ${PUBLIC_DIR}
ENV PORT=3030
EXPOSE 3030
CMD ["sh","-c","serve -s \"$PUBLIC_DIR\" -l 3030"]
