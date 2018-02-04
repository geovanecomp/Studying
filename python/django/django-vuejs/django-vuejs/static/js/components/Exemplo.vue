<template lang="html">
  <div>
    <table class="table">
      <thead>
        <th><a href="#" @click="sort($event, 'fields.titulo')">Título</a></th>
        <th><a href="#" @click="sort($event, 'fields.plataformas')">Plataformas</a></th>
      </thead>
      <tbody>
          <tr v-for="game in games">
            <td>{{ game.fields.titulo }}</td>
            <td>{{ game.fields.plataformas }}</td>
          </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  data() {
    return {
      sortDirection: 'desc',
      games: []
    }
  },
  mounted() {
    this.$http.get('/homepage/games')
      .then((req) => this.games = req.data)
  },
  methods: {
    sort(event, field) {
      event.preventDefault()
      if (this.sortDirection == 'desc') {
        this.sortDirection = 'asc'
      } else {
        this.sortDirection = 'desc'
      }

      this.games = _.orderBy(this.games, field, this.sortDirection)
    }
  }
}
</script>

<style lang="css">
</style>
