import Vue from 'vue'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies, { expires: "1d" })

export { VueCookies }
