<template>
  <v-content>
    <NavBar :title="title"/>
    <form class="search-form text-center" @submit.prevent="getExternalMovies">
      <v-icon class="mdi mdi-magnify" style="color: #717171" size="25"></v-icon>
      <input prepend-icon="mdi-account" type="text" v-model="search" class="search-input" autofocus placeholder="Search Movie...">
    </form>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-row v-for="(movie, index) in filteredMovies" :key="index" class="mb-6" no-gutters>
          <v-card dark flat>
            <v-img :src="backdropUrl + movie.backdropPath" max-height="300px"
                   gradient="to right, rgba(0,0,0,0.6), rgba(0,0,0,0.8)">
              <v-col lg="2" class="float-left pa-0">
                <img :src="imgUrl + movie.posterPath" style="max-height: 300px"
                     @error="onImageLoadFailure" alt="cover image"/></v-col>
              <v-col lg="7" class="float-left ml-5">
                <h1 class="display-1">{{ movie.title }}</h1>
                <v-chip-group>
                  <v-chip label small color="info">Theatrical Release:</v-chip>
                  <v-chip label small color="info">Digital Release: {{ movie.releaseDate | moment('ll')}}</v-chip>
                  <v-chip label small color="info"><a :href="tmdbUrl + movie.theMovieDbId" target="_blank">Home Page</a>
                  </v-chip>
                  <v-chip label small>test</v-chip>
                  <v-chip label small>test</v-chip>
                </v-chip-group>
                <p class="mt-5">{{ movie.overview }}</p>
              </v-col>
              <v-col lg="auto" class="float-left">
              <span v-if="movie.available">
                <v-btn outlined color="success"><v-icon>mdi-check</v-icon> Available</v-btn>
                </span>
                <span v-else>
                  <v-btn v-if="movie.requested" outlined color="success">
                  <v-icon>mdi-check</v-icon> Requested</v-btn>
                <v-btn v-else outlined color="primary" @click="requestMovie(movie.theMovieDbId, movie.originalLanguage), activeTab=1">
                  <v-icon>mdi-plus</v-icon> Request</v-btn>
                </span>
              </v-col>
            </v-img>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
    <v-snackbar
            v-model="snackbar"
    >
      {{ text }}
      <v-btn
              color="pink"
              text
              @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>


    <!--<v-col cols="12">
      <v-row justify="center">
        <v-col v-for="(movie, index) in filteredMovies" :key="index" lg="8" md="10" sm="12">
          <v-card dark hover>
            <v-list-item three-line outlined max-heigth="200" class="pa-0">
              <img :src="imgUrl + movie.posterPath" style="max-height: 300px" @error="onImageLoadFailure"/>
              <v-list-item-content class="pa-0">
                <v-img :src="backdropUrl + movie.backdropPath" height="300px"
                       gradient="to right, rgba(0,0,0,0.8), rgba(0,0,0,0.6)">
                  <v-card-title>{{movie.title}}</v-card-title>
                  <v-card-subtitle>{{movie.overview}}</v-card-subtitle>
                  &lt;!&ndash;<v-card-text>
                    <v-chip-group>
                      <v-chip label small>
                        <v-icon v-if="item.status === 'Released'" left>mdi-movie</v-icon>
                        <v-icon v-else-if="item.status === 'Planned'" left>mdi-clipboard-text</v-icon>
                        <v-icon
                                v-else-if="item.status === 'In Production' || 'Post Production'"
                                left
                        >mdi-create</v-icon>
                        {{ item.status }}
                      </v-chip>
                      <v-chip
                              label
                              small
                              v-if="item.release_date !== null"
                      >{{ item.release_date | moment('ll') }}</v-chip>
                      <v-chip
                              label
                              small
                              v-if="item.downloaded"
                              color="success"
                      >{{ item.size_on_disk | prettyBytes }}</v-chip>
                      <v-chip
                              label
                              small
                              v-if="!item.downloaded && new Date(item.release_date) <= new Date()"
                              color="error"
                      >missing</v-chip>
                      <v-chip
                              label
                              small
                              v-if="!item.downloaded && new Date(item.release_date) >= new Date()"
                              color="info"
                      >missing</v-chip>
                    </v-chip-group>
                  </v-card-text>&ndash;&gt;
                </v-img>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-col>-->


    <!--<div class="flex-container">
      <div class="flex-item" v-for="(movie, index) in filteredMovies" :key="index">
        <div class="item-image-wrap">
          <router-link :to="'movies/' + movie.id">
            <img :src="imgUrl + movie.posterPath" class="item-image" @error="onImageLoadFailure"/>
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
    </div>-->
  </v-container>
  </v-content>
</template>

<script>
    import NavBar from "./NavBar";
    export default {
        name: "Request",
        components: {NavBar},
        data() {
            return {
                title: 'Request',
                search: '',
                isActive: false,
                image: '../assets/default_movie_poster.png',
                imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2",
                backdropUrl: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces",
                tmdbUrl: "https://www.themoviedb.org/movie/",
                snackbar: false,
                text: '',
            };
        },
        mounted() {
            this.$store.dispatch('fetchExternalPopularMovies')
        },
        methods: {
            singleMovie(id) {
                this.$router.push("/movie/" + id);
            },
            getExternalMovies() {
                this.$store.dispatch('fetchExternalMovies', this.search)
            },
            onImageLoadFailure(event) {
                event.target.src = 'https://ombi.meelsnet.nl//images/default_movie_poster.png'

                console.log(event)
            },
            requestMovie(tmdbid, language) {
                this.$store.dispatch('requestMovie', {
                    tmdbid: tmdbid,
                    language: language,
                })
                .then(response => {
                    this.text = response.data.message
                    this.snackbar = true;
                })
            }
        },
        computed: {
            filteredMovies() {
                return this.$store.getters.getExternalMovies
            }

        }
    };
</script>
<style scoped>
  .v-application a {
    text-decoration: none;
  }
</style>