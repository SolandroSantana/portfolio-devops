FROM node:18-alpine as builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY . /app

RUN npm install

EXPOSE 3000:3000

ENTRYPOINT npm run dev