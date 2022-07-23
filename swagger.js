const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-autogen.json';
const endpointsFiles = ['./routes'];

swaggerAutogen(outputFile, endpointsFiles);
