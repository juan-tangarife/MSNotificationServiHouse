FROM node:19

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm i cors

COPY . .

RUN npx prisma generate 

CMD [ "npm", "start" ]