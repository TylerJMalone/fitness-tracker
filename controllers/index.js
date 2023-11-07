const express = require('express');
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

const app = express();

app.use('/', homeRoutes);
app.use('/api', apiRoutes);

// ... other middleware and routing configurations

module.exports = app;
