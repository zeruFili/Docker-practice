# Use the official Node.js image with Alpine
FROM node:18-alpine

# Create an app directory
WORKDIR /app

# Copy package.json and package-lock.json (if available) for dependency installation
COPY package*.json ./

# Install only production dependencies to keep the image lean
RUN npm ci --only=production

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 3030

# Use a non-root user to run the application for security
USER node

# Set environment variable for production
ENV NODE_ENV=production

# Implement a health check for the application
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start the application
CMD ["npm", "start"]