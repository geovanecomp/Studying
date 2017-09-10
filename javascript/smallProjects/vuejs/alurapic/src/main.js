// Global View Object
import Vue from 'vue'
import App from './App.vue'

// Registrando os modulos na aplicacao
// Se não colocar './', irá procurar dentor da pasta node_modules
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import { routes } from './routes'
import './directives/Transform'
import VeeValidate, { Validator } from 'vee-validate'
import msg from './pt_BR'

import 'bootstrap/dist/css/bootstrap.css'
//Disponibilizando o vue resource para toda a aplicação.
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(routes)
// Configurando mensagens em portugues
Validator.addLocale(msg)
Vue.use(VeeValidate, {
  locale: 'pt_BR',
})

// Setando para usar o endereco de desenvolvimento ou de producao
Vue.http.options.root = process.env.API_URL ? process.env.API_URL : 'http://localhost:3000'

// Setando authorization no header da requisicao
// Vue.http.interceptors.push((req, next) => {
//
//     // é possível colocar informações no header antes do envio da requisição
//     req.headers.set('Authorization', 'informação de segurança aqui');
//     console.log('Lidando com o request');
//
//     next(res => {
//       console.log('Lidando com a resposta')
//       // é possível acessar os dados da reposta e realizar transformações antes
//       console.log(res.body);
//     });
//
// });


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
