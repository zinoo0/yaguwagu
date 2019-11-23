const express = require('express');
const cors = require('cors');
const app = express();
const { api, naverMap, partner, user } = require('./routes');

app.use(cors()); // cors({ origin: ['', '', ''] })
app.use(express.json({limit: '50mb'}));
app.use('/user', user);
app.use('/partner', partner);
app.use('/map', naverMap);
app.use('/api', api);

module.exports = app;