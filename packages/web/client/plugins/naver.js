import naver from 'vue-naver-maps';
import Vue from 'vue';
import config from '../config/config';

Vue.use(naver, config.NAVER_CONFIG);