module.exports = {
  env: {
    // BACK
    // BACK_URL: 'https://2cxmcgita0.execute-api.ap-northeast-2.amazonaws.com/dev',
    BACK_URL: 'http://localhost:9090',
    BACK_URL_SPRING: 'https://wgwrg00105.execute-api.ap-northeast-2.amazonaws.com/dev/client',
    // FIREBASE CONFIG
    FIREBASE_API_KEY: "AIzaSyA4oDOjfgkH0Drrmi9GnkCppAWzCsLl8Sc",
    FIREBASE_AUTH_DOMAIN: "yagyuwagu.firebaseapp.com",
    FIREBASE_DATABASE_URL: "https://yagyuwagu.firebaseio.com",
    FIREBASE_PROJECT_ID: "yagyuwagu",
    FIREBASE_STORAGE_BUCKET: "yagyuwagu.appspot.com",
    FIREBASE_MESSAGING_SENDER_ID: "496882769897",
    FIREBASE_APP_ID: "1:496882769897:web:65b4867da277f348817578",
    FIREBASE_MEASUREMNET_ID: "G-6CVKHRENK5",
    // NAVER CONFIG
    NAVER_CLIENT_ID: "bgfvw3ntvm",
    // S3
  },
  modules: [
    '@nuxtjs/axios',
  ],
  plugins: ['~/plugins/firebase', '~/plugins/naver'],
  head: {
    title: '야구와구',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Yaguwagu - Client' }
    ],
  },
  loading: { color: '#3B8070' },
  build: {
    // extend (config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // },
  },
  buildModules: [
    '@nuxtjs/vuetify'
  ],
}