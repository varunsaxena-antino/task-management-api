FROM node:20-alpine

# Create non-root user (SECURITY REQUIREMENT)
RUN addgroup appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY src ./src

ENV NODE_ENV=production

# Switch to non-root user
USER appuser

EXPOSE 5000

CMD ["node", "src/server.js"]
