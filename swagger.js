const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Job Tracker API', version: '1.0.0' },
      components: {
      securitySchemes: {
        bearerAuth: { // This will create the Authorization: Bearer <token> option
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [ // ✅ Apply globally
      { bearerAuth: [] }
    ]
  },
  apis: ['./routes/*.js']
};
const specs = swaggerJsDoc(options);
module.exports = { swaggerUi, specs };
