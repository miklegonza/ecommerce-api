const express = require('express');
const conectardb = require('./src/config/db');
const cors = require('cors');
const app = express();
const routes = require('./src/routes/routes');

conectardb();

app.use(cors());
app.use(express.json());

app.use('/api/v1', routes);

module.exports = app;
