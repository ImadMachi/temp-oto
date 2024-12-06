FROM node:20-alpine 
WORKDIR /app
COPY package*.json ./
EXPOSE 3000
RUN npm install -g pnpm
COPY . .
RUN pnpm install
CMD pnpm dev