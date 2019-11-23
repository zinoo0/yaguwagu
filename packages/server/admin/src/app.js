const express = require('express');
const cors = require('cors');
const app = express();
const { partner, user, order } = require('./routes');

app.use(cors()); // cors({ origin: ['', '', ''] })
app.use(express.json({limit: '50mb'}));
app.use('/user', user);
app.use('/partner', partner);
app.use('/order', order);

module.exports = app;