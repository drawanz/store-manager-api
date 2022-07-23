const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const router = require('./routes/index');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/', router);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;