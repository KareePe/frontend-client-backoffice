// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {
      title: "SALESX TECHNOLOGIES",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#2a2a2a" },
        { name: "msapplication-navbutton-color", content: "#2a2a2a" },
        { name: "apple-mobile-web-app-status-bar-style", content: "#2a2a2a" },
        {
          hid: "description",
          name: "description",
          content: "SALESX TECHNOLOGIES",
        },
        {
          name: "description",
          content: "SALESX TECHNOLOGIES",
        },
        {
          name: "keywords",
          content: "SALESX TECHNOLOGIES",
        },
      ],
    },
  },
  css: [
    "~/assets/css/main.css",
    "vuetify/styles/main.sass",
    "@mdi/font/css/materialdesignicons.css",
  ],
  build: {
    transpile: ["vuetify", "@vuepic/vue-datepicker"],
  },
  plugins: [
    { src: "~/plugins/apexcharts.ts", mode: "client" },
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@pinia/nuxt", "nuxt-pdfmake"],
  pdfmake: {
    /**
     * Enable the module
     * @default true
     */
    enabled: true,
    /**
     * Enable the plugin injection
     * @default true
     */
    enablePlugin: true,
    /**
     * Enable the composable injection. This adds both the `usePDFMake` & `useFontPresets` composables
     * @default true
     */
    enableComposable: true,
    /**
     * Enable the devtools tab
     * @default true
     */
    enableDevtools: true,
  },
};
