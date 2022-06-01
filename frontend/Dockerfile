FROM node:alpine

WORKDIR /frontend/src

COPY package*.json /frontend/

RUN npm install

COPY . /frontend/

EXPOSE 3000

CMD ["npm", "start"]