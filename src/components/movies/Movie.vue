<template>
  <v-container fluid class="pa-0">
    <v-parallax :src="backdropUrl + singleMovie.backdrop_path" class="pa-0">
      <div class="wrap">
        <div class="big-teaser-content">
          <div class="big-teaser-data-wrap">
            <div class="big-teaser-item-data">
              <span class="item-year">{{ singleMovie.release_date | moment('YYYY') }}</span>
              <span class="item-title">{{ singleMovie.title }}</span>
              <span class="item-genre">
              <a v-for="(genres, index) in singleMovie.genres" :key="index">
                {{ genres.name }}
              </a>
            </span>

            </div>
            <div class="big-teaser-buttons">
              <a v-if="singleMovie.homepage.includes('netflix')" :href="singleMovie.homepage" target="_blank"
                 class="button-netflix">
                Netflix
              </a>
              <a v-if="singleMovie.homepage.includes('amazon')" :href="singleMovie.homepage" target="_blank"
                 class="button-amazon">
                Amazon Prime
              </a>
              <a v-if="singleMovie.homepage.includes('disney')" :href="singleMovie.homepage" target="_blank"
                 class="button-disney">
                Disney+
              </a>
              <a v-if="singleMovie.homepage.includes('apple')" :href="singleMovie.homepage" target="_blank"
                 class="button-apple">
                Apple TV+
              </a>
              <!-- TODO: nog aanpassen in database om youtube trailer id te krijgen -->
              <!--<span @click="openTrailer()" v-if="singleMovie.youtube_key" class="button-trailer" prepend-icon="mdi-play"> Watch Trailer</span>-->

              <a :href="`https://www.themoviedb.org/movie/${singleMovie.tmdb_id}`" target="_blank"
                 class="button-tmdb-rating">
                <i v-if="singleMovie.tmdb_id"><b><!--{{ singleMovie.tmdb_id }}--></b> TMDb</i>
                <i v-else>No TMDB Rating</i>
              </a>
              <a v-if="singleMovie.imdb_id" :href="`http://www.imdb.com/title/${singleMovie.imdb_id}`" target="_blank"
                 class="button-imdb-rating">
                <i v-if="singleMovie.imdb_id"><b><!--{{ singleMovie.imdb_id }}--></b> IMDb</i>
                <i v-else>No IMDb Rating</i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </v-parallax>
    <div class="subpage-content">
      <div class="wrap">
        <div class="subpage-sidebar">
          <div class="subpage-poster-wrap">
          <img :src="imgUrl + singleMovie.poster_path" width="272" height="408"/>
          </div>
        </div>
        <div class="subpage-overview">
          <h2 class="display-1 my-4">Overview</h2>
          <p>{{ singleMovie.overview }}</p>
        </div>

      </div>
    </div>
  </v-container>
</template>

<script>
    import MovieService from "@/services/MovieApi";

    export default {
        props: ["id"],
        data() {
            return {
                singleMovie: "",
                loading: true,
                imgUrl: "https://image.tmdb.org/t/p/original",
                backdropUrl: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces"
            };
        },
        mounted() {
            MovieService.fetchSingleMovie(this.id)
                .then(response => {
                    this.singleMovie = response;
                    this.loading = false;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        methods: {
            back() {
                this.$router.push("/latestmovies");
            }
        }
    };
</script>
