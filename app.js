const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const swaggerFile = require('./swagger-output.json');
const router = require('./routes/index');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/', router);
app.use(cors());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;