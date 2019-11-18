module.exports = {
  env: {
    BACK_URL: 'https://2cxmcgita0.execute-api.ap-northeast-2.amazonaws.com/dev',
    // BACK_URL: 'http://localhost:9090',
    BACK_URL_SPRING: 'https://wgwrg00105.execute-api.ap-northeast-2.amazonaws.com/dev/client',
  },
  modules: [
    '@nuxtjs/axios',
  ],
  plugins: ['~/plugins/firebase', '~/plugins/naver'],
  head: {
    title: 'Yaguwagu',
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