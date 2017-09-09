import Cadastro from './components/cadastro/Cadastro.vue'
import Home from './components/home/Home.vue'

export const routes = [
  // Objeto com duas propriedades, url e o componente a ser renderizado
  { path: '', name: 'home',  component: Home, titulo: 'Home', menu: true },
  { path: '/cadastro', name: 'cadastro', component: Cadastro , titulo: 'Cadastro', menu: true },
  // Qualquer outra url acessada, me redireciona para a home
  { path: '*', component: Home, menu: false}
]
