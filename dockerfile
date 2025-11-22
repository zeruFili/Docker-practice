# Use the official lightweight Node.js image.
FROM node:18-alpine

# Create a working directory for the app.
WORKDIR /app

# Copy package.json and package-lock.json for dependencies installation.
COPY package*.json ./

# Install only production dependencies to reduce image size.
RUN npm install --production

# Copy the rest of the application files to the container.
COPY . .

# Expose the application on port 3000.
EXPOSE 3000

# Switch to a non-root user for security.
USER node

# Set the environment variable indicating the application is in production mode.
ENV NODE_ENV=production

# Healthcheck to monitor the application. 
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Command to start the application.
CMD ["npm", "start"]