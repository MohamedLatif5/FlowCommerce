FROM node:20-alpine

# Update packages and fix vulnerabilities
RUN apk update && apk upgrade

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# For development environment
ENV NODE_ENV=development

# port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]