// Library
const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./config');

// Router
const user = require('./routes/user');
const partner = require('./routes/partner');
const map = require('./routes/map');
const api = require('./routes/api');

// Lambda
const awsServerlessExpress = require('aws-serverless-express');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const server = awsServerlessExpress.createServer(app);
app.use(awsServerlessExpressMiddleware.eventContext());
exports.handler = (event, context) => { awsServerlessExpress.proxy(server, event, context) }

// app.use
app.use(cors()); // (cors({ origin: ['', '', ''] }))
app.use(express.json({limit: '50mb'}));

// router Setting
app.use('/user', user);
app.use('/partner', partner);
app.use('/map', map);
app.use('/api', api);

app.listen(config.PORT, () => {
  console.log(`Server is listening on ${config.PORT}`);
});