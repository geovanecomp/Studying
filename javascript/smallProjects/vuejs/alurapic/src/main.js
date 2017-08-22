// Global View Object
import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource'
new Vue({
    // el = elementoo qual será colocado o componente
  el: '#app',
  render: h => h(App)
})
