# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Use a lightweight web server to serve the app
FROM nginx:alpine
COPY mega-city-cab-frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]