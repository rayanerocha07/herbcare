import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#48525E',
        green1: '#77FEAF',
        green2: '#55E995'
      },
    }
  }
});
