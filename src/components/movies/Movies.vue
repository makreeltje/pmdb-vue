<template>
  <v-container>
    <v-row justify="center">
      <v-col v-if="loading" xs="12" sm="12" md="8" lg="6" xl="8">
        <v-row xs="12" sm="12" md="8" lg="6" xl="8">
          <v-layout align-center justify-center>
            <v-progress-circular :size="200" :width="10" color="rgb(229, 160, 13)" indeterminate></v-progress-circular>
          </v-layout>
        </v-row>
      </v-col>
      <div style="width: 70%">
        <v-text-field v-model="search" placeholder="Search Title..."></v-text-field>
      </div>

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
    </v-row>
  </v-container>
</template>

<script>
    export default {
        name: "Movies",
        data() {
            return {
                search: '',
                loading: true,
                isActive: false,
                imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2"
            };
        },
        mounted() {
            this.$store.dispatch('fetchMovies')
                .then(() => {
                    this.loading = false
                })
        },
        methods: {
            singleMovie(id) {
                this.$router.push("/movie/" + id);
            }
        },
        computed: {
            filteredMovies() {
                return this.$store.getters.getMovies.filter(movie => {
                    return movie.title
                        .toLowerCase()
                        .replace(/[&/\\#,+()$~%.'":*?<>{}\-_ ]/g, '')
                        .includes(this.search
                            .toLowerCase()
                            .replace(/[&/\\#,+()$~%.'":*?<>{}\-_ ]/g, ''))
                })
            }

        }
    };
</script>
<style scoped>
  .v-application a {
    text-decoration: none;
  }
</style>