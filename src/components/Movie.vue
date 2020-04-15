<template>
  <v-container v-if="loading">
    <v-layout align-center justify-center>
      <v-progress-circular :size="200" :width="10" color="primary" indeterminate></v-progress-circular>
    </v-layout>
  </v-container>

  <v-container fluid v-else class="pa-0">
    <v-layout wrap>
      <v-flex xs12>
        <v-img
          :src="backdropUrl + singleMovie.backdrop_path"
          height="400px"
          gradient="to top right, rgba(80,80,80,10), rgba(25,32,72,.7)"
          align="right"
        >
          <v-col>
            <v-row>wifoeheiowfho</v-row>
            <v-row>diowadjoij</v-row>
          </v-col>
          <v-col>
            <v-row>wifoeheiowfho</v-row>
            <v-row>diowadjoij</v-row>
          </v-col>
          
          <!--<v-img :src="imgUrl + singleMovie.poster_path" max-width="250" />-->
        </v-img>
        <v-card dark hover class="pa-5">
          <v-list-item three-line outlined max-heigth="200" >
            <v-img :src="imgUrl + singleMovie.poster_path" max-width="200" />
            <v-list-item-content class="pa-0">
              <v-img
                :src="imgUrl + singleMovie.backdrop_path"
                height="300px"
                gradient="to top right, rgba(80,80,80,10), rgba(25,32,72,.7)"
              >
                <v-card-title>{{singleMovie.title}}</v-card-title>
                <v-card-subtitle>{{singleMovie.overview}}</v-card-subtitle>
                <v-card-text>
                  <v-chip-group>
                    <v-chip label small>
                      <v-icon v-if="singleMovie.status === 'Released'" left>mdi-movie</v-icon>
                      <v-icon v-else-if="singleMovie.status === 'Planned'" left>mdi-clipboard-text</v-icon>
                      <v-icon
                        v-else-if="singleMovie.status === 'In Production' || 'Post Production'"
                        left
                      >mdi-create</v-icon>
                      {{ singleMovie.status }}
                    </v-chip>
                    <v-chip
                      label
                      small
                      v-if="singleMovie.release_date !== null"
                    >{{ singleMovie.release_date | moment('ll') }}</v-chip>
                    <v-chip
                      label
                      small
                      v-if="singleMovie.downloaded"
                      color="success"
                    >{{ singleMovie.size_on_disk | prettyBytes }}</v-chip>
                    <v-chip
                      label
                      small
                      v-if="!singleMovie.downloaded && new Date(singleMovie.release_date) <= new Date()"
                      color="error"
                    >missing</v-chip>
                    <v-chip
                      label
                      small
                      v-if="!singleMovie.downloaded && new Date(singleMovie.release_date) >= new Date()"
                      color="info"
                    >missing</v-chip>
                  </v-chip-group>
                </v-card-text>
              </v-img>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-flex>
    </v-layout>
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