const express = require('express');
const cors = require('cors');
const app = express();
const { partner, user } = require('./routes');

// app
app.use(cors()); // cors({ origin: ['', '', ''] })
app.use(express.json({limit: '50mb'}));
app.use('/user', user);
app.use('/partner', partner);

module.exports = app;