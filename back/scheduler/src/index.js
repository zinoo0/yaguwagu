const cron = require('node-cron');

const service = require('./services');

// 1시간 마다 기준 데이터 동기화
cron.schedule('*/59 * * * *', () => {
  service.partnerSync();
  service.userSync();
  service.orderSync();
});
service.partnerSync();
service.userSync();
service.orderSync();