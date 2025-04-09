FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app/
EXPOSE 3000
CMD ["npm", "run", "dev"]