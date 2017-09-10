// import Cadastro from './components/cadastro/Cadastro.vue'
// Aplicando lazy loading. Assim  carregar determinado componente assincronamente apenas quando o usuário acessar sua rota 
const Cadastro = () => System.import('./components/cadastro/Cadastro.vue')
import Home from './components/home/Home.vue'

export const routes = [
  // Objeto com duas propriedades, url e o componente a ser renderizado
  { path: '', name: 'home',  component: Home, titulo: 'Home', menu: true },
  { path: '/cadastro', name: 'cadastro', component: Cadastro , titulo: 'Cadastro', menu: true },
  { path: '/cadastro/:id', name: 'altera', component: Cadastro, menu: false },
  // Qualquer outra url acessada, me redireciona para a home
  { path: '*', component: Home, menu: false}
]
