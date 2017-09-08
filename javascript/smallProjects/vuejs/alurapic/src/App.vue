<template>
  <div class="corpo">
    <h1 class="centralizado">{{ titulo }}</h1>
    <ul class="lista-fotos">
      <!-- $event eh uma variavel especial que possui as informacoes do evento -->
      <!-- Toda vez que eu digitar, vou executar filtro = $event.target.value -->
      <!-- v-on é um data bind da view para a fonte de dados -->
      <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="Filtre por parte do título" name="" value="">

      <!-- Data bind da fonte de dados para a view -->
      <!-- {{ filtro }} -->

      <!-- Acessando o computed fotosComFiltro -->
      <li class="lista-fotos-item" v-for="foto in fotosComFiltro">

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
      fotos: [],
      filtro: ''
    }
  },

  computed: {
    fotosComFiltro () {
      if (this.filtro) {
        // Varrendo a lista de fotos e filtrando apenas as fotos coincidirem com a busca
        let exp = new RegExp(this.filtro.trim(), 'i')
        return this.fotos.filter(foto => exp.test(foto.titulo))
      } else {
        return this.fotos
      }
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

  .filtro {
    display: block;
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
