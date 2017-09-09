// Global View Object
import Vue from 'vue'
import App from './App.vue'

// Registrando os modulos na aplicacao
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import { routes } from './routes'
import './directives/Transform'

//Disponibilizando o vue resource para toda a aplicação.
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(routes)

Vue.http.options.root = 'http://localhost:3000'


//Se a chave e o valor possuem o mesmo nome, posso omitir:
// const router = new VueRouter({
//   routes: routes
// })

const router = new VueRouter({
  routes,
  mode: 'history'
 })

new Vue({
    // el = elementoo qual será colocado o componente
  el: '#app',
  router: router,
  //ou apenas router
  render: h => h(App)
})
