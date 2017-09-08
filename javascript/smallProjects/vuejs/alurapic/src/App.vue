<template>
  <div class="corpo">
    <nav>
      <ul>
        <li v-for="route in routes">
          <router-link :to="route.path ? route.path : '/'">
            {{ route.titulo }}
          </router-link>
        </li>
        <!-- <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/cadastro">Cadastro</router-link></li> -->
      </ul>
    </nav>
    <!-- Exibir várias páginas dinamicamente aqui de acordo com a rota -->
    <router-view></router-view>
  </div>
</template>

<script>
import { routes } from './routes'
export default {
  data () {
    return {
      routes
    }
  }
}
</script>

<style>
  .corpo {
    font-family: Helvetica, sans-serif;
    width: 96%;
    margin: 0 auto;
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
