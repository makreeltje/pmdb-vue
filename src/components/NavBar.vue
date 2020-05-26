<template>
  <div>
    <v-app-bar color="#e5a00d" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>PMDB</v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="!loggedIn">
        <router-link to="/register">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-account-plus</v-icon>
              </v-btn>
            </template>
            <span>Register</span>
          </v-tooltip>
        </router-link>

        <router-link to="/login">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-login</v-icon>
              </v-btn>
            </template>
            <span>Login</span>
          </v-tooltip>
        </router-link>
      </div>

      <div v-if="loggedIn">
        <router-link to="/profile">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </template>
            <span>Profile</span>
          </v-tooltip>
        </router-link>
        <router-link to="/logout">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-logout</v-icon>
              </v-btn>
            </template>
            <span>Logout</span>
          </v-tooltip>
        </router-link>
      </div>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-switch color="secondary" v-on="on" v-model="$vuetify.theme.dark" hide-details inset></v-switch>
        </template>
        <span>Dark</span>
      </v-tooltip>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list>
        <router-link to="/profile">
          <v-list-item v-if="loggedIn">
            <v-list-item-content>
              <v-list-item-title>Welcome</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>

      <v-list-item v-if="!loggedIn">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logged out</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <router-link to="/home">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <!--<router-link to="/admin">
            <v-list-item v-if="loggedIn" link>
                <v-list-item-icon>
                    <v-icon>mdi-gavel</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Admin Dashboard</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </router-link>

        <router-link to="/mod">
            <v-list-item v-if="loggedIn" link>
                <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Moderator Dashboard</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </router-link>

        <router-link v-if="loggedIn" to="/user">
            <v-list-item link>
                <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>User Dashboard</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </router-link>-->

        <router-link v-if="loggedIn" to="/movies">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-movie</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Movies</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link v-if="loggedIn" to="/request">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-movie-search</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Request</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block href @click.prevent="logOut">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>
<script>
    export default {
        name: 'NavBar',
        data() {
            return {
                drawer: null,
            }
        },
        methods: {
            logOut() {
                this.$store.dispatch("auth/logout");
                this.$router.push("/login");
            }
        },
        computed: {
            loggedIn() {
                return this.$store.getters.loggedIn
            }
        }
    }
</script>
<style>
  .v-application a {
    text-decoration: none;
  }

  @media (max-width: 1320px) {
  }

  @media (max-width: 1140px) {
  }

  @media (max-width: 860px) {
  }

  @media (max-width: 740px) {
  }

  @media (max-width: 450px) {
  }

  @media (max-width: 1320px) {
  }

  @media (max-width: 860px) {
  }

  @media (max-width: 620px) {
  }

  .big-teaser-buttons span,
  .big-teaser-buttons a {
    float: left;
    padding: 6px 14px;
    font-size: 17px;
    cursor: pointer;
    text-decoration: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-flex: 1;
    -ms-flex: auto;
    flex: auto;
    -webkit-transition: background 0.2s ease 0s;
    transition: background 0.2s ease 0s;
  }

  @media (max-width: 740px) {
    .big-teaser-buttons span,
    .big-teaser-buttons a {
      font-size: 15px;
    }
  }

  @media (max-width: 450px) {
    .big-teaser-buttons span,
    .big-teaser-buttons a {
      width: auto;
    }
  }

  @media (max-width: 860px) {
  }

  @media (max-width: 740px) {
  }

  @media (max-width: 450px) {
  }

  @media (max-width: 740px) {
  }

  .big-teaser-item-data .item-year a,
  .big-teaser-item-data .item-genre a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    background: rgba(72, 72, 72, 0.5);
    font-size: 14px;
    padding: 3px 7px;
    margin: 0 5px 5px 0;
    float: left;
    -webkit-transition: background 0.2s ease 0s;
    transition: background 0.2s ease 0s;
  }

  .big-teaser-item-data .item-year a:last-child,
  .big-teaser-item-data .item-genre a:last-child {
    margin: 0;
  }

  .big-teaser-item-data .item-year a:hover,
  .big-teaser-item-data .item-genre a:hover {
    background: #484848;
  }

  .big-teaser-item-data .item-year a:active,
  .big-teaser-item-data .item-genre a:active {
    background: rgba(72, 72, 72, 0.7);
  }

  .big-teaser-item-data .item-year i,
  .big-teaser-item-data .item-genre i {
    font-style: normal;
    text-transform: uppercase;
  }

  @media (max-width: 860px) {
  }

  @media (max-width: 740px) {
  }

  @media (max-width: 740px) {
  }

  .button-tmdb-rating i {
    font-style: normal;
  }

  .button-imdb-rating i {
    font-style: normal;
  }

  .button-netflix i {
    font-style: normal;
  }

  .button-amazon i {
    font-style: normal;
  }

  .button-disney i {
    font-style: normal;
  }

  .button-apple i {
    font-style: normal;
  }

  @media (max-width: 860px) {
  }

  @media (max-width: 620px) {
  }

  @media (max-width: 740px) {
  }

  @media (max-width: 860px) {
  }

  @media (max-width: 740px) {
  }

  @media (max-width: 450px) {
    .subpage-overview h2 {
      font-size: 14px;
    }
  }

  .subpage-overview p {
    float: left;
    clear: both;
    color: #484848;
    font-size: 15px;
    line-height: 19pt;
  }

  @media (max-width: 450px) {
    .subpage-overview p {
      font-size: 14px;
    }
  }

  .dark .subpage-overview p {
    color: #717171;
  }

  @media (max-width: 740px) {
  }

  .subpage-poster-wrap img {
    border: 0;
  }

  @media (max-width: 860px) {
    .subpage-poster-wrap img {
      max-width: 200px;
      height: auto;
    }
  }

  @media (max-width: 740px) {
  }


</style>