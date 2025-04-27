const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const doc = {
  info: {
    title: 'MSNotifications',
    description: 'Documentación de la API de notificaciones para ServiHouse',
  },
  host: `localhost:${process.env.PORT || 3000}`,
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['src/routes/routes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);