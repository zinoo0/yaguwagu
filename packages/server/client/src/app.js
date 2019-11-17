const express = require('express');
const cors = require('cors');
const app = express();
const { api, map, partner, user } = require('./routes');

// app
app.use(cors()); // cors({ origin: ['', '', ''] })
app.use(express.json({limit: '50mb'}));
app.use('/user', user);
app.use('/partner', partner);
app.use('/map', map);
app.use('/api', api);

// Lambda
const awsServerlessExpress = require('aws-serverless-express');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const server = awsServerlessExpress.createServer(app);
app.use(awsServerlessExpressMiddleware.eventContext());
exports.handler = (event, context) => { awsServerlessExpress.proxy(server, event, context) }

module.exports = app;