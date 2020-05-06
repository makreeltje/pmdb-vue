<template>
  <v-container>
    <v-row justify="center">
      <v-col v-if="loading" xs="12" sm="12" md="8" lg="6" xl="8">
        <v-row xs="12" sm="12" md="8" lg="6" xl="8">
          <v-layout align-center justify-center>
            <v-progress-circular :size="200" :width="10" color="primary" indeterminate></v-progress-circular>
          </v-layout>
        </v-row>
      </v-col>

      <div class="wrap-content">
          <div class="item-wrap" v-for="(item, index) in moviesFiltered" :key="index">
            <div class="item-image-wrap">
              <router-link :to="'movies/' + item.id">
                <img :src="imgUrl + item.poster_path" class="item-image"/>
              </router-link>
            </div>
            <div class="item-content">
              <span class="item-year">{{ item.release_date | moment('YYYY') }}</span>
              <router-link :to="'movies/' + item.id">{{ item.title }}</router-link>
              <span class="item-genre">
            <span v-for="(genres, index) in item.genres" :key="index">{{ genres.name }}<span
                    v-if="index != item.genres.length - 1">, </span></span>
            </span>
            </div>
          </div>
        </div>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        name: "User",
        data() {
            return {
                search: "",
                movies: [],
                diskSpace: [],
                systemStatus: null,
                loading: true,
                isActive: false,
                imgUrl: "https://image.tmdb.org/t/p/original"
            };
        },
        mounted() {
            this.$store.dispatch('retrieveMovies')
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    this.loading = false
                })
        },
        methods: {
            singleMovie(id) {
                this.$router.push("/movie/" + id);
            }
        },
        computed: {
            moviesFiltered() {
                return this.$store.getters.moviesFiltered
            }
        }
    };
</script>
<style scoped>
  .v-application a {
    text-decoration: none;
  }

  .v-card {
    transition: opacity .2s ease-in-out;
  }

  .v-card:not(.on-hover) {
    opacity: 0.6;
  }
</style>