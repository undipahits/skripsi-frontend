export default {
  ssr: false,
  target: 'static',

  publicRuntimeConfig: {
    baseApiUrl: process.env.BASE_API_URL || 'https://api.cirsqu.cloud',
    baseUrl: process.env.BASE_URL || 'https://dinkes.netlify.app',
    onlyLogin: true,
    appShare: false,
  },

  head: {
    title: 'Arsip Media',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://demos.creative-tim.com/argon-design-system/assets/css/argon-design-system.min.css?v=1.2.2',
      },
    ],
  },

  loading: {
    color: '#5e72e4',
    height: '3px',
  },

  css: ['@/assets/css/main.css', 'sweetalert2/dist/sweetalert2.min.css'],

  plugins: [
    { src: '~/plugins/errorResponse.js', ssr: true },
    { src: '~/plugins/Axios.js', ssr: true },
    { src: '~/plugins/permissions.js', ssr: true },
    { src: '~/plugins/Sweetalert.js', ssr: false },
  ],

  components: true,

  buildModules: [],

  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    'nuxt-client-init-module',
    'nuxt-route-meta',
  ],

  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: true, // Or `bvCSS: false`
    icons: false,
  },

  axios: {
    baseURL: process.env.BASE_API_URL || 'https://api.cirsqu.cloud',
  },

  build: {},
}
