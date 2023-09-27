// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    vscode: { enabled: true },
  },
  build: {
    transpile: ["trpc-nuxt"],
  },
  modules: ["@nuxtjs/tailwindcss"],
  typescript: { typeCheck: true, strict: true },
});
