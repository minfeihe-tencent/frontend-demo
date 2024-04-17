# Use a lightweight Node.js image as the base
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies (adjust for yarn if needed)
RUN npm install

# Copy the rest of the project files (excluding node_modules)
COPY . .

# Build the React app (adjust the command for your build process)
RUN npm run build

# Create a new image based on nginx:alpine for serving the app
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy the build output from the builder stage
COPY --from=builder /app/build .

# Expose port 80 (adjust if needed)
EXPOSE 80

# Use a basic Nginx configuration for serving static files
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]