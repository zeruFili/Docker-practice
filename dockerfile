# Use the official Node.js image with Alpine
FROM node:18-alpine

# Install curl for health checks
RUN apk add --no-cache curl

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

# Use a non-root user to run the application for enhanced security
USER node

# Set environment variable for production
ENV NODE_ENV=production
ENV PORT=3030

# Clear npm cache after installation to reduce image size
RUN npm cache clean --force

# Start the application
CMD ["npm", "start"]