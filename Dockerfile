FROM node:19

RUN mkdir /home/app
WORKDIR /home/app

COPY package*.json ./
COPY . .

EXPOSE 3333

CMD ["npm", "start"]