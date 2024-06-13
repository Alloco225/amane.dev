export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'amane.dev',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: "stylesheet", href: "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css", },
    {
      rel: 'stylesheet', type: 'text/css', media: 'screen',
      href: 'https://unpkg.com/webcam-easy/demo/style/webcam-demo.css',
    },
    { rel: 'stylesheet', type: 'text/css', media: 'screen', href: 'style/virtual-glasses.css', },
    ],
    script: [

      { src: "https://unpkg.com/@tensorflow/tfjs-core@2.4.0/dist/tf-core.min.js" },
      { src: "https://unpkg.com/@tensorflow/tfjs-converter@2.4.0/dist/tf-converter.min.js" },
      { src: "https://unpkg.com/@tensorflow/tfjs-backend-webgl@2.4.0/dist/tf-backend-webgl.min.js" },
      { src: "https://unpkg.com/@tensorflow/tfjs-backend-cpu@2.4.0/dist/tf-backend-cpu.min.js" },
      { src: "https://unpkg.com/@tensorflow-models/face-landmarks-detection@0.0.1/dist/face-landmarks-detection.min.js" },
      //
      { src: "//code.jquery.com/jquery-3.3.1.min.js", },
      { src: "https://unpkg.com/@tensorflow/tfjs-core@2.4.0/dist/tf-core.min.js", },
      { src: "https://unpkg.com/@tensorflow/tfjs-converter@2.4.0/dist/tf-converter.min.js", },
      { src: "https://unpkg.com/@tensorflow/tfjs-backend-webgl@2.4.0/dist/tf-backend-webgl.min.js", },
      { src: "https://unpkg.com/@tensorflow/tfjs-backend-cpu@2.4.0/dist/tf-backend-cpu.min.js", },
      { src: "https://unpkg.com/@tensorflow-models/face-landmarks-detection@0.0.1/dist/face-landmarks-detection.min.js", },
      { type: "text/javascript", src: "https://unpkg.com/webcam-easy/dist/webcam-easy.min.js", },
      { type: "text/javascript", src: "js/webcam-ui-lib.js", },
      // {
      //   src: '/face-api/face-api.js'
      // },
      // {
      //   src: "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"
      // },
      // { src: "https://cdn.jsdelivr.net/npm/@tensorflow-models/blazeface" }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: '~/plugins/three.js', mode: 'client'},
    // { src: '~/plugins/test_3d.js', mode: 'client'},
    // { src: '~/plugins/3.js', mode: 'client'},
    // { src: '~/plugins/face-api/face-api.js', mode: 'client'},
    { src: '~/plugins/3d/main.js', mode: 'client' },
    // { src: '~/plugins/3d/tensor.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
