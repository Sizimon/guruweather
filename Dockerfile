# Use the official Node.js 14 image as the base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Add a script to inject environment variables at runtime
RUN echo '#!/bin/sh' > /app/env.sh && \
    echo 'for file in /app/build/static/js/*.js; do' >> /app/env.sh && \
    echo '  sed -i "s|REACT_APP_WEATHER_API_KEY_PLACEHOLDER|$REACT_APP_WEATHER_API_KEY|g" $file;' >> /app/env.sh && \
    echo 'done' >> /app/env.sh && \
    chmod +x /app/env.sh

# Expose port 5000
EXPOSE 5000

# Command to run the app
CMD ["/bin/sh", "-c", "/app/env.sh && serve -s build -l 5000"]