<template>
  <div class="corpo">
    <h1 class="centralizado">{{ titulo }}</h1>
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto in fotos">

        <painel :titulo="foto.titulo">
          <img  class="imagem-responsiva" :src="foto.url" :alt="foto.titulo">
        </painel>

      </li>
    </ul>
  </div>
</template>

<script>
import Painel from './components/shared/painel/Painel.vue'

export default {
  components: {
      'painel': Painel
  },

  data () {
    return {
      titulo: 'Alura Pic',
      fotos: []
    }
  },

  // hook disparado sempre o componente é criado (lifecycle hooks)
  created() {
    // Efetuando uma requisição, convertendo para json e setando no attr fotos.
    this.$http.get('http://localhost:3000/v1/fotos')
      .then(res => res.json())
      .then(fotos => this.fotos = fotos, err => console.log(err))
  }
}
</script>

<style>
  .corpo {
    font-family: Helvetica, sans-serif;
    width: 96%;
    margin: 0 auto;
  }

  .centralizado {
    text-align: center;
  }

  .lista-fotos {
    list-style: none;
  }

  .lista-fotos .lista-fotos-item {
    display: inline-block;
  }

  .imagem-responsiva {
    width: 100%;
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
