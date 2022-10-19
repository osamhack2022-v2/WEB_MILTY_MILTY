const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');
const path = require('path');


const options = {
  swaggerDefinition: {
    info: {
      title: 'API 명세',
      version: '1.0.0',
      description: 'MILTY API Description',
    },
    host: 'localhost:5000',
    basePath: '/'
  },
  apis: [path.resolve(__dirname, "../routes/*.js")]
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};