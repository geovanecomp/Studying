<template>
  <div>
    <button @click="disparaAcao()" class="botao" :class="estiloDoBotao" type="tipo" name="button">{{ rotulo }}</button>
  </div>
</template>
<script>
export default {
  props: {
    tipo: {
      required: true,
      type: String
    },

    rotulo: {
      required: true,
      type: String
    },

    confirmacao: Boolean,

    estilo: String
  },

  methods: {
    disparaAcao() {
      if (this.confirmacao) {
        if (confirm('Confirma operação?')) {
          // Dispara um evendo com o nome que eu quiser
          this.$emit('botaoAtivado')
        }
        return
      }

      this.$emit('botaoAtivado')
    }
  },

  computed: {
    estiloDoBotao () {
      if (this.estilo === 'padrao' || !this.estilo) return 'botao-padrao'
      if (this.estilo === 'perigo') return 'botao-perigo'
    }
  }
}
</script>
<style lang="sass">
  @import './Botao.scss'
</style>
