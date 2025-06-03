FROM node:19

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm i cors

COPY . .
COPY .env .env

RUN npx prisma generate 


EXPOSE 8010

CMD [ "npm", "start" ]