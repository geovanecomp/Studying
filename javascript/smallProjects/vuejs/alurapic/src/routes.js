import Cadastro from './components/cadastro/Cadastro.vue'
import Home from './components/home/Home.vue'

export const routes = [
  // Objeto com duas propriedades, url e o componente a ser renderizado
  { path: '', component: Home, titulo: 'Home' },
  { path: '/cadastro', component: Cadastro , titulo: 'Cadastro' }
]
