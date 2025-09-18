from node:22-alpine

WORKDIR /usr/src/app
COPY ./package*.json /usr/src/app/
COPY ./vite.config.js /usr/src/app/
COPY ./index.html /usr/src/app/
COPY ./src/ /usr/src/app/src
COPY ./public/ /usr/src/app/public

RUN npm install

RUN npm install -g serve

RUN npm run build

CMD ["serve", "./dist/", "-p", "5173"]
