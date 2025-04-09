FROM node:22-alpine

WORKDIR /opt/app
COPY package.json package.json
RUN npm install --production
COPY . .
RUN npm run build
CMD ["node", "./dist/main.js"]
