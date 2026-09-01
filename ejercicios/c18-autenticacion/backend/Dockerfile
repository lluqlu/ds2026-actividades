# Backend Dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Modo dev con recarga (tsx watch). El cliente de Prisma se genera al arrancar.
CMD ["npm", "run", "dev"]
