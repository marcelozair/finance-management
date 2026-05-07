# ================================
# Stage 1: Builder
# ================================
FROM node:23-alpine AS builder

WORKDIR /app

# Copy root package files (monorepo root)
COPY package*.json ./
COPY turbo.json ./

# Copy the specific app package.json
COPY apps/api/package*.json ./apps/api/

# Copy workspace packages if any (adjust paths as needed)
# COPY packages/shared/package*.json ./packages/shared/

# Install all dependencies from root (monorepo install)
RUN npm ci

# Copy full source code
COPY . .

# Build only the nest app using turbo
RUN npx turbo run build --filter=api


# ================================
# Stage 2: Production
# ================================
FROM node:23-alpine AS production

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy root package files
COPY package*.json ./
COPY turbo.json ./

# Copy the specific app package.json
COPY apps/api/package*.json ./apps/api/

# Install only production dependencies from root
RUN npm ci --only=production && npm cache clean --force

# Copy built app from builder stage
COPY --from=builder /app/apps/api/dist ./apps/api/dist

# Set ownership to non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "apps/api/dist/main"]
