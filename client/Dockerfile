FROM node:20-alpine AS build-stage

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
