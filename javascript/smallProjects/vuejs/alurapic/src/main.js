// Global View Object
import Vue from 'vue'
import App from './App.vue'

// Registrando os modulos na aplicacao
import VueResource from 'vue-resource'

//Disponibilizando o vue resource para toda a aplicação.
Vue.use(VueResource)
new Vue({
    // el = elementoo qual será colocado o componente
  el: '#app',
  render: h => h(App)
})
