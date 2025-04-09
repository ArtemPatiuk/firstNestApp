FROM node:22-alpine
WORKDIR /opt/app


COPY package*.json ./


RUN npm install --production


COPY . .


RUN npm run build
RUN npm prune --production
CMD ["node", "./dist/main.js"]
