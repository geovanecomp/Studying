<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>To access the API Restful Documentation, please access:</p>
    <a href="http://localhost:8000/api">API</a>
    <div class="container">
      <table class="table">
        <thead>
          <th><a href="#">Título</a></th>
          <th><a href="#">Plataformas</a></th>
        </thead>
        <tbody>
            <tr v-for="game in games" :key="game.id">
              <td>{{ game.fields.titulo }}</td>
              <td>{{ game.fields.plataformas }}</td>
            </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App with the Django Framework',
      games: []
    }
  },
  mounted () {
    this.$http.get('http://localhost:8000/homepage/games')
      .then((req) => (this.games = req.data))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
}

.container {
  display: flex;
  justify-content: center;
}
</style>
