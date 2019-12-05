module.exports = {
  env: {
    // Back
    BACK_URL_SPRING: 'https://6s8sgz130c.execute-api.ap-northeast-2.amazonaws.com/dev',
    // BACK_URL_SPRING: 'http://localhost:3086/partner',    
  },
  modules: [
    '@nuxtjs/axios',
  ],
  plugins: ['~/plugins/firebase'],
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Yaguwagu - Partner' }
    ],
  },
  loading: { color: '#3B8070' },
  build: {
	// ESLint
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