const cron = require('node-cron');

const service = require('./modules');

// 1시간 마다 기준 데이터 동기화
cron.schedule('*/59 * * * *', () => {
  service.partnerSync();
  service.userSync();
});