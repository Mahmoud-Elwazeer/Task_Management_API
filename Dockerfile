# Use Node.js base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install -g typescript
# Install PM2 globally
RUN npm install -g pm2

# Copy the rest of the application files
COPY . .

RUN npm run build
