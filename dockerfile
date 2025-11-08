FROM node:18-alpine

# Create an app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 3000

# Use a non-root user to run the application
USER node

# Set environment variable
ENV NODE_ENV=production


HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start the application
CMD ["npm", "start"]