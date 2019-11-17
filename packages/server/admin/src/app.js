// Library
const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./config/config');

// Router
const user = require('./routes/user');
const partner = require('./routes/partner');

// Lambda
const awsServerlessExpress = require('aws-serverless-express');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const server = awsServerlessExpress.createServer(app);
app.use(awsServerlessExpressMiddleware.eventContext());
exports.handler = (event, context) => { awsServerlessExpress.proxy(server, event, context) }

// app.use(cors({ origin: ['', '', ''] }))
app.use(cors());
app.use(express.json({limit: '50mb'}));

// router 설정
app.use('/user', user);
app.use('/partner', partner);

app.listen(config.PORT, () => {
  console.log(`Server is listening on ${config.PORT}`);
});