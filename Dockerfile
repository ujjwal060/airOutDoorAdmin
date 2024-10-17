# Stage 1: Build the Vite app
FROM node:18 as build

# Set working directory inside the container
WORKDIR /app

# Copy the package.json and vite.config.mjs files
COPY package.json vite.config.mjs ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vite application for production
RUN npm run build

# Stage 2: Serve the built app using a simple Node.js server
FROM node:18

# Set working directory
WORKDIR /app

# Install 'serve' globally to serve static files
RUN npm install -g serve

# Copy build files from the previous stage
COPY --from=build /app/dist /app

# Expose port 3000 to serve the app
EXPOSE 2030

# Start the app with 'serve'
CMD ["serve", "-s", ".", "-l", "2030"]
