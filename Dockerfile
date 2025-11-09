FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# --- Runner Stage ---
FROM node:18-alpine AS runner

# Set environment variables
ENV NODE_ENV production
ENV PORT 3000

# Create a non-root user and switch to it
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy standalone output from builder stage
COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/public ./public

# Expose the port the application runs on
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]