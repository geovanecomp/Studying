<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado"></h2>

    <h2 v-if="foto._id" class="centralizado">Alterando</h2>
    <h2 v-else class="centralizado">Incluindo</h2>

    <form @submit.prevent="grava()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input data-vv-as="título" name="titulo" v-validate data-vv-rules="required|min:3|max:30" id="titulo" autocomplete="off" v-model="foto.titulo">
        <span class="erro" v-show="errors.has('titulo')">{{ errors.first('titulo')}}</span>
      </div>
      <div class="controle">
        <label for="url">URL</label>
        <input name="url" v-validate data-vv-rules="required" id="url" autocomplete="off" v-model.lazy="foto.url">
        <span class="erro" v-show="errors.has('url')">Url obrigatória</span>

        <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo"/>
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" v-model="foto.descricao"></textarea>
      </div>

      <div class="centralizado">
        <botao rotulo="GRAVAR" tipo="submit"/>
        <router-link :to="{ name: 'home' }"><botao rotulo="VOLTAR" tipo="button" /></router-link>
      </div>

    </form>
  </div>
</template>
<script>
  import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
  import Botao from '../shared/botao/Botao.vue';
  import Foto from '../domain/foto/Foto'
  import FotoService from '../domain/foto/FotoService'
  export default {
    data() {
      return {
        foto: new Foto(),
        // $route existe pois estou utilizando o vue-router
        id: this.$route.params.id
      }
    },

    components: {
      'imagem-responsiva': ImagemResponsiva,
      'botao': Botao
    },

    created() {
      this.service = new FotoService(this.$resource)
      if (this.id) {
        this.service
          .busca(this.id)
          .then(foto => this.foto = foto)
      }
    },

    methods: {
      grava() {
        // $validator existe por causa do vee-validator
        this.$validator
          .validateAll()
          .then(success => {
            if (success) {
              this.service
              .cadastra(this.foto)
              .then(() => {
                if (this.id) this.$router.push({ name: 'home' })
                this.foto = new Foto
              }, err => console.log(err))
            }
          })

      }
    }
  }
</script>
<style scoped>
.centralizado {
  text-align: center;
  }
  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

 .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }

  .erro {
    color: red;
  }
</style>
