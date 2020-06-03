<template>
  <v-content>
    <NavBar :title="title"/>
    <v-container v-if="loading" fill-height class="justify-center">
      <div>
        <v-progress-circular
                :size="100"
                color="primary"
                indeterminate
        ></v-progress-circular>
      </div>
    </v-container>

    <v-container v-else class="pa-0" fluid>
      <v-parallax :src="backdropUrl + getMovie.backdrop_path" class="pa-0">
        <div class="wrap">
          <div class="big-teaser-content">
            <div class="big-teaser-data-wrap">
              <div class="big-teaser-item-data">
                <span class="item-year">{{ getMovie.release_date | moment('YYYY') }}</span>
                <span class="item-title">{{ getMovie.title }}</span>
                <span class="item-genre">
              <a :key="index" v-for="(genres, index) in getMovie.genres">
                {{ genres.name }}
              </a>
            </span>

              </div>
              <div class="big-teaser-buttons">
                <a :href="getMovie.homepage" class="button-netflix" target="_blank"
                   v-if="getMovie.homepage.includes('netflix')">
                  Netflix
                </a>
                <a :href="getMovie.homepage" class="button-amazon" target="_blank"
                   v-if="getMovie.homepage.includes('amazon')">
                  Amazon Prime
                </a>
                <a :href="getMovie.homepage" class="button-disney" target="_blank"
                   v-if="getMovie.homepage.includes('disney')">
                  Disney+
                </a>
                <a :href="getMovie.homepage" class="button-apple" target="_blank"
                   v-if="getMovie.homepage.includes('apple')">
                  Apple TV+
                </a>
                <!-- TODO: nog aanpassen in database om youtube trailer id te krijgen -->
                <!--<span @click="openTrailer()" v-if="getMovie.youtube_key" class="button-trailer" prepend-icon="mdi-play"> Watch Trailer</span>-->

                <a :href="`https://www.themoviedb.org/movie/${getMovie.tmdb_id}`" class="button-tmdb-rating"
                   target="_blank">
                  <i v-if="getMovie.tmdb_id"><strong><!--{{ getMovie.tmdb_id }}--></strong> TMDb</i>
                  <i v-else>No TMDB Rating</i>
                </a>
                <a :href="`http://www.imdb.com/title/${getMovie.imdb_id}`" class="button-imdb-rating" target="_blank"
                   v-if="getMovie.imdb_id">
                  <i v-if="getMovie.imdb_id"><strong><!--{{ getMovie.imdb_id }}--></strong> IMDb</i>
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
              <img :src="imgUrl + getMovie.poster_path" height="408" width="272" alt="poster image"/>
            </div>
          </div>
          <div class="subpage-overview">
            <h2 class="display-1 my-4">Overview</h2>
            <p>{{ getMovie.overview }}</p>
          </div>

        </div>
      </div>
    </v-container>
  </v-content>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import NavBar from "../NavBar";

    export default {
        components: {NavBar},
        props: ["id"],
        data() {
            return {
                title: 'Movie',
                loading: true,
                imgUrl: "https://image.tmdb.org/t/p/original",
                backdropUrl: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces"
            };
        },
        methods: {
            ...mapActions(['fetchMovie'])
        },
        mounted() {
            this.fetchMovie(this.id)
                .then(() => {
                    this.loading = false
                })
        },
        computed: {
            ...mapGetters(['getMovie'])
        }
    };
</script>
