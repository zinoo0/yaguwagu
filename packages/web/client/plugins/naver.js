import naver from 'vue-naver-maps';
import Vue from 'vue';

Vue.use(naver, {
  clientID: process.env.NAVER_CLIENT_ID
});