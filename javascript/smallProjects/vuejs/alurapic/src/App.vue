<template>
  <div class="corpo">

    <meu-menu :rotas="routes"/>

    <transition name="pagina">
      <!-- Exibir várias páginas dinamicamente aqui de acordo com a rota -->
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
import { routes } from './routes'
import Menu from './components/shared/menu/Menu.vue'
export default {
  data () {
    return {
      // Obtendo apenas as urls q sao menus
      routes: routes.filter(route => route.menu)
    }
  },
  components: {
    'meu-menu': Menu
  }
}
</script>

<style>
  .corpo {
    font-family: Helvetica, sans-serif;
    width: 96%;
    margin: 0 auto;
  }

  .pagina-enter, .pagina-leave-active {
    opacity: 0;
  }

  .pagina-enter-active, .pagina-leave-active {
    transition: opacity 0.5s;
  }

/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}*/
</style>
