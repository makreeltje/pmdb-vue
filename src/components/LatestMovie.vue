<template>
  <v-container fluid>
    <v-row>
      <v-col xs="12" sm="12" md="2" lg="3" xl="2">
        <v-card hover class="my-3">
          <v-card-title>Filters</v-card-title>
          <v-card-text>
            <v-text-field label="Search by Title" v-model="search"></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col v-if="loading" xs="12" sm="12" md="8" lg="6" xl="8">
        <v-row xs="12" sm="12" md="8" lg="6" xl="8">
          <v-layout align-center justify-center>
            <v-progress-circular :size="200" :width="10" color="primary" indeterminate></v-progress-circular>
          </v-layout>
        </v-row>
      </v-col>

      <v-col v-else xs="12" sm="12" md="8" lg="6" xl="8">
        <v-row>
          <v-col v-for="(item, index) in filteredList" :key="index" cols="12" md="12"> 
           <router-link :to="'movies/' + item.id">
            <v-card dark hover>
              <v-list-item three-line outlined max-heigth="200" class="pa-0">
                <v-img :src="imgUrl + item.poster_path" max-width="200" />
                <v-list-item-content class="pa-0">
                  <v-img :src="imgUrl + item.backdrop_path" height="300px" gradient="to top right, rgba(80,80,80,10), rgba(25,32,72,.7)">
                  <v-card-title>{{item.title}}</v-card-title>
                  <v-card-subtitle>{{item.overview}}</v-card-subtitle>
                  <v-card-text>
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
                  </v-card-text>
                  </v-img>
                </v-list-item-content>
              </v-list-item>
            </v-card>
           </router-link>
          </v-col>
        </v-row>
      </v-col>

      <v-col xs="12" sm="12" md="3" xl="2">
        <v-card  hover class="my-3">
          <v-card-title>Legend</v-card-title>
          <v-row>
            <v-col cols="8"><v-card-text>Downloaded and Available</v-card-text></v-col>
            <v-col><v-card-text><v-chip label small :ripple="false" color="success"></v-chip></v-card-text></v-col>
          </v-row>
          <v-row>
            <v-col cols="8"><v-card-text>Missing but not yet Available</v-card-text></v-col>
            <v-col><v-card-text><v-chip label small :ripple="false" color="info"></v-chip></v-card-text></v-col>
          </v-row>
          <v-row>
            <v-col cols="8"><v-card-text>Missing and considered Available</v-card-text></v-col>
            <v-col justify="center"><v-card-text><v-chip label small :ripple="false" color="error"></v-chip></v-card-text></v-col>
          </v-row>
        </v-card>
        
        <v-card  hover class="my-3">
          <v-card-title>System Status</v-card-title>
          <v-row>
            <v-col><v-card-text>Free Space</v-card-text></v-col>
            <v-col><v-card-text><v-chip label small>{{diskSpace[1].freeSpace | prettyBytes}}</v-chip></v-card-text></v-col>
          </v-row>
          <v-row>
            <v-col><v-card-text>Total Space</v-card-text></v-col>
            <v-col><v-card-text><v-chip label small>{{diskSpace[1].totalSpace | prettyBytes}}</v-chip></v-card-text></v-col>
          </v-row>
          <v-row>
            <v-col><v-card-text>System Version</v-card-text></v-col>
            <v-col><v-card-text><v-chip label small>{{systemStatus.version}}</v-chip></v-card-text></v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MovieService from "../services/MovieApi";

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
    MovieService.fetchMovieCollection()
      .then(response => {
        this.movies = response;
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
      });

    MovieService.fetchDiskSpace()
      .then(response => {
        this.diskSpace = response;
      })
      .catch(error => {
        console.log(error);
      });

    MovieService.fetchSystemStatus()
      .then(response => {
        this.systemStatus = response;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    singleMovie(id) {
      this.$router.push("/movie/" + id);
    }
  },
  computed: {
    filteredList() {
      return this.movies.filter(response => {
        return response.title.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  }
};
</script>
<style scoped>
.v-application a {
  text-decoration: none;
}
</style>