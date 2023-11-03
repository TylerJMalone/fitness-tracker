const express = require('express');
const routes = require('./routes');

const app = express();

app.use('/', homeRoutes);

// ... other middleware and routing configurations

module.exports = app;
