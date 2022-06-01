FROM node:alpine

WORKDIR /backend/src

COPY package*.json /backend/

RUN npm install

COPY . /backend/

EXPOSE 5000

CMD ["npm", "start"]