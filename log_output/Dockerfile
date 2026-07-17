FROM node:20-alpine

WORKDIR /usr/src/app

RUN npm install -g tsx

COPY index.ts .

CMD ["tsx", "index.ts"]