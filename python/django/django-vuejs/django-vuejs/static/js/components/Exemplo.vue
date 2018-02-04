<template lang="html">
  <div>
    <table class="table">
      <thead>
        <th>Título</th>
        <th>Plataformas</th>
      </thead>
      <tbody>
          <tr v-for="game in games">
            <td>{{ game.fields.titulo }}</td>
            <td>{{ game.fields.plataformas }}</td>
          </tr>
        {% endfor %}
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  data() {
    return {
      games: []
    }
  },
  mounted() {
    this.$http.get('/homepage/games')
      .then((req) => this.games = req.data)
  }
}
</script>

<style lang="css">
</style>
