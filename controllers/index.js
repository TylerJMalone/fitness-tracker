const express = require('express');
const routes = require('../controllers/homeRoutes');

const app = express();

app.use('/', routes);

// ... other middleware and routing configurations

module.exports = app;
