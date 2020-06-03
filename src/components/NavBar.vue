<template>
  <div>
    <v-app-bar color="#e5a00d" dark>
      <v-app-bar-nav-icon @click="drawer = true" name="menu"></v-app-bar-nav-icon>

      <v-toolbar-title>{{title}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="!loggedIn">
        <router-link to="/register">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on" name="register">
                <v-icon>mdi-account-plus</v-icon>
              </v-btn>
            </template>
            <span>Register</span>
          </v-tooltip>
        </router-link>

        <router-link to="/login">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on" name="login">
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
              <v-btn icon v-on="on" name="profile">
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </template>
            <span>Profile</span>
          </v-tooltip>
        </router-link>
        <router-link to="/logout">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on" name="logout">
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
              <v-list-item-title>Welcome {{getUser.username}}</v-list-item-title>
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
        <div v-if="loggedIn">
          <router-link to="/movies">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-movie</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Movies</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link v-if="requestRole || adminRole" to="/request">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-movie-search</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Request</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link v-if="adminRole" to="/admindashboard">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-account-details</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Admin Dashboard</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </div>

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
  import {mapGetters} from 'vuex'
    export default {
        name: 'NavBar',
        props: {
            title: {},
        },
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
            ...mapGetters(['getUser']),
            loggedIn() {
                return this.$store.getters.loggedIn
            },
            requestRole() {
                if (this.getUser && this.getUser.roles) {
                    return this.getUser.roles.includes('ROLE_REQUEST')
                }
                return false
            },
            adminRole() {
                if (this.getUser && this.getUser.roles) {
                    return this.getUser.roles.includes('ROLE_ADMIN')
                }
                return false
            },
            moderatorRole() {
                if (this.getUser && this.getUser.roles) {
                    return this.getUser.roles.includes('ROLE_MODERATOR')
                }
                return false
            },
            userRole() {
                if (this.getUser && this.getUser.roles) {
                    return this.getUser.roles.includes('ROLE_USER')
                }
                return false
            },

        }
    }
</script>
<style>


</style>