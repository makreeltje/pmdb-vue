<template>
  <v-content>
    <NavBar :title="title" />
    <form class="search-form text-center">
      <v-icon class="mdi mdi-magnify" style="color: #717171" size="25"></v-icon>
      <input prepend-icon="mdi-account" type="text" v-model="search" class="search-input" autofocus
             placeholder="Search Movie...">
    </form>


    <v-container>
      <v-row justify="center">
        <v-col v-if="loading" xs="12" sm="12" md="8" lg="6" xl="8">
          <v-row xs="12" sm="12" md="8" lg="6" xl="8">
            <v-layout align-center justify-center>
              <v-progress-circular :size="200" :width="10" color="rgb(229, 160, 13)"
                                   indeterminate></v-progress-circular>
            </v-layout>
          </v-row>
        </v-col>
        <MovieTile :filtered-movies="filteredMovies" :img-url="imgUrl"/>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
    import {mapActions} from 'vuex'
    import NavBar from "../NavBar";
    import MovieTile from "./MovieTile";

    export default {
        name: "Movies",
        components: {
            MovieTile,
            NavBar
        },
        data() {
            return {
                title: 'Movies',
                search: '',
                loading: true,
                isActive: false,
                imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2",
                backdropUrl: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces",
                tmdbUrl: "https://www.themoviedb.org/movie/",
            };
        },
        mounted() {
            this.fetchMovies()
                .then(() => {
                    this.loading = false
                })
        },
        methods: {
            ...mapActions(['fetchMovies']),
            singleMovie(id) {
                this.$router.push("/movie/" + id);
            },
            onImageLoadFailure(event) {
                event.target.src = 'https://ombi.meelsnet.nl//images/default_movie_poster.png'

                console.log(event)
            },
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