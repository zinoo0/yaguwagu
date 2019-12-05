module.exports = {
  env: {
    // Backend
    BACK_URL: 'https://bpi8orijii.execute-api.ap-northeast-2.amazonaws.com/dev',
    // BACK_URL: 'http://localhost:9091',
  },
  modules: [
    '@nuxtjs/axios',
  ],
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Yaguwagu - Admin' }
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
    ['@nuxtjs/vuetify', {
      theme: {
        dark: true,
      },
    }]
  ],
}