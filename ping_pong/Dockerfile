FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache postgresql-client

COPY package*.json ./
RUN npm install --omit=dev

COPY index.ts .
COPY cpu-stresser.js .

CMD ["npx", "tsx", "index.ts"]