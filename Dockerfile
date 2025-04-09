FROM node:22-alpine

WORKDIR /opt/app

COPY package*.json ./


RUN npm install --production
RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

# Старт
CMD ["node", "dist/main"]
