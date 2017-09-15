FROM node:alpine

RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm install -s

CMD node index.js