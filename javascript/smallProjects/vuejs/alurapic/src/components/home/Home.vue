<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
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
          <imagem-responsiva v-transform:rotate.animacao.reverse="15" :url="foto.url" :titulo="foto.titulo"/>
          <botao
            tipo="button"
            rotulo="Remover"
            :confirmacao="true"
            estilo="perigo"
            @botaoAtivado="remove(foto)"/>
        </painel>

      </li>
    </ul>
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue'
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue'
import Transform from '../../directives/Transform'
import FotoService from '../domain/foto/FotoService'
export default {
  components: {
      'painel': Painel,
      'imagem-responsiva': ImagemResponsiva,
      'botao': Botao
  },

  directives: {
    'transform': Transform
  },

  data () {
    return {
      titulo: 'Alura Pic',
      fotos: [],
      filtro: '',
      mensagem: ''
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
    },
  },

  methods: {
    remove (foto) {
      // Usa o resource estabelecido em created(). O delete automaticamente utiliza o parametro id
      // this.resource.delete({id: foto._id})

      this.service.apaga(foto._id)
      .then(() => {
        let indice = this.fotos.indexOf(foto)
        // Inves de pedir uma nova listao ao servidor, é melhor remover este elemento do array de fotos
        this.fotos.splice(indice, 1)
        this.mensagem = 'Foto removida com sucesso'
      },
      err => {
        console.log(err)
        this.mensagem = 'Não foi possível excluir a foto.'
      })
      // this.$http
      //   .delete(`v1/fotos/${foto._id}`)
      //   .then(() => {
      //     let indice = this.fotos.indexOf(foto)
      //     // Inves de pedir uma nova listao ao servidor, é melhor remover este elemento do array de fotos
      //     this.fotos.splice(indice, 1)
      //     this.mensagem = 'Foto removida com sucesso'
      //   },
      //   err => {
      //     console.log(err)
      //     this.mensagem = 'Não foi possível excluir a foto.'
      //   })
    }
  },

  // hook disparado sempre o componente é criado (lifecycle hooks)
  created() {
    this.service = new FotoService(this.$resource)

    this.service
      .lista()
      .then(fotos => this.fotos = fotos, err => console.log(err))

    // ** Outras formas de se fazer a requisição **
    // query() é inteligente o suficiente para ignorar o parametro id
    // this.resource = this.$resource('v1/fotos{/id}')
    // this.resource.query()
    //   .then(res => res.json())
    //   .then(fotos => this.fotos = fotos, err => console.log(err))

    // Efetuando uma requisição, convertendo para json e setando no attr fotos.
    // Outra forma não comum utilizando http
    // this.$http.get('v1/fotos')
    //   .then(res => res.json())
    //   .then(fotos => this.fotos = fotos, err => console.log(err))
  }
}
</script>

<style>
  .centralizado {
    text-align: center;
  }

  .lista-fotos {
    list-style: none;
  }

  .lista-fotos .lista-fotos-item {
    display: inline-block;
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
