<template>

  <div class="painel">
    <h2 class="painel-titulo">{{ titulo }}</h2>
    <!-- Devo usar o slot para dizer qual parte do meu componente recebera o conteudo passado na instancia do mesmo -->
    <slot class="painel-conteudo">
    </slot>
  </div>

</template>

<script>
export default {
  props: [
    'titulo'
  ]
}
</script>

<!-- Ao utilizar a palavra scoped, o estilo será utilizado apenas neste componente -->
<style scoped>
  /* Estilo do painel */
  .painel {
    padding: 0 auto;
    border: solid 2px grey;
    display: inline-block;
    margin: 5px;
    box-shadow: 5px 5px 10px grey;
    width: 200px;
    height: 100%;
    vertical-align: top;
    text-align: center;
  }

  .painel .painel-titulo {
    text-align: center;
    border: solid 2px;
    background: lightblue;
    margin: 0 0 15px 0;
    padding: 10px;
    text-transform: uppercase;
  }

  * {
    box-shadow: 5px 5px 5px;
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
