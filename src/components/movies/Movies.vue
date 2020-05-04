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


      <!--<v-col v-else cols="8">
        <v-row>
          <v-col v-for="(item, index) in moviesFiltered" :key="index" cols="12" md="2">
            <router-link :to="'movies/' + item.id">
              <v-hover v-slot:default="{ hover }">
                <v-card flat :class="{ 'on-hover': hover }" style="overflow-y: auto; height:360px">
                  <v-img class="white&#45;&#45;text align-end" :src="imgUrl + item.poster_path"/>
                  <v-card-text class="text&#45;&#45;primary font-weight-black px-0 pb-0 overline">{{item.title}}</v-card-text>
                  <v-card-text class="text&#45;&#45;primary pa-0 overline">
                  <span v-for="(genres, index) in item.genres" :key="index">{{ genres.name }}<span
                          v-if="index != item.genres.length - 1">, </span></span>
                  </v-card-text>
                  <v-card-actions class="pa-0">
                    <v-card-subtitle class="pa-0 overline">{{ item.release_date | moment('YYYY') }}</v-card-subtitle>
                    <v-spacer></v-spacer>
                    <v-card-subtitle class="pa-0 overline"><span v-if="item.downloaded">downloaded</span><span
                            v-if="!item.downloaded">missing</span></v-card-subtitle>
                  </v-card-actions>
                </v-card>
              </v-hover>
            </router-link>
          </v-col>
        </v-row>
      </v-col>-->
    </v-row>
  </v-container>
</template>

<script>
    // import MovieService from "../../services/MovieApi";

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