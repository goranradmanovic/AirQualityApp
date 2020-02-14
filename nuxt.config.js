import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    //titleTemplate: '%s - ' + process.env.npm_package_name,
    titleTemplate: '%s',
    //title: process.env.npm_package_name || '',
    title: 'Air Quality',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'Content-Type', content: 'text/html; charset=ISO-8859-1'},
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge'},
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'keywords', content: 'Air, Quality, App, Application, Ecology, Green' },
      { property: 'og:url', content: 'https://cocky-jones-a58ae7.netlify.com/' },
      { property: 'og:image:width', content: '776' },
      { property: 'og:image:height', content: '616' },
      { property: 'og:image:secure_url', content: '/meta/air-thumbnail.jpg' },
      { property: 'og:image', content: '/meta/air-thumbnail.jpg' },
      { property: 'og:image:alt', content: 'Social thumbnail image' },
      { name: 'twitter:title', content: 'Air Quality App'},
      { name: 'twitter:description', content: process.env.npm_package_description || '' },
      { name: 'twitter:image', content: '/meta/air-thumbnail.jpg' },
      { name: 'twitter:image:alt', content: 'Social thumbnail image' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { rel: 'canonical', href: 'https://cocky-jones-a58ae7.netlify.com/' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    // SASS file in the project
    '@/assets/sass/main.sass'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
  ],

  axios: {
    // proxyHeaders: false
  },

  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
