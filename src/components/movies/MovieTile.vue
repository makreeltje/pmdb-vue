<template>
  <div class="flex-container">
    <div class="flex-item" v-for="(movie, index) in filteredMovies" :key="index">
      <div class="item-image-wrap">
        <router-link :to="'movies/' + movie.id">
          <img :src="imgUrl + movie.poster_path" loading="lazy" class="item-image" alt/>
        </router-link>
      </div>
      <div class="item-content">
        <span class="item-year">{{ movie.release_date | moment('YYYY') }}</span>
        <router-link :to="'movies/' + movie.id" class="link">{{ movie.title }}</router-link>
        <span class="item-genre">
            <span v-for="(genres, index) in movie.genres" :key="index">{{ genres.name }}<span
                    v-if="index != movie.genres.length - 1">, </span></span>
            </span>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'MovieTile',
        props: {
            filteredMovies: {},
            imgUrl: {}
        }
    }
</script>
<style scoped>
  .v-application a {
    text-decoration: none;
  }
</style>