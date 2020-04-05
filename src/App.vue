<template>
  <v-app>
    <div>
      <v-app-bar color="primary" dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>PMDB</v-toolbar-title>

        <v-spacer></v-spacer>

        <div v-if="!currentUser">
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

        <div v-if="currentUser">
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
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon href @click.prevent="logOut" v-on="on">
                <v-icon>mdi-logout</v-icon>
              </v-btn>
            </template>
            <span>Logout</span>
          </v-tooltip>
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
            <v-list-item v-if="currentUser">
              <v-list-item-content>
                <v-list-item-title>Hello, {{ currentUser.username }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list>

        <v-list-item v-if="!currentUser">
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

          <router-link to="/admin">
            <v-list-item v-if="showAdminBoard" link>
              <v-list-item-icon>
                <v-icon>mdi-gavel</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Admin Dashboard</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/mod">
            <v-list-item v-if="showModeratorBoard" link>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Moderator Dashboard</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link v-if="currentUser" to="/user">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>User Dashboard</v-list-item-title>
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

    <div>
      <v-content>
        <router-view />
      </v-content>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }
      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_MODERATOR");
      }
      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.v-application a {
  text-decoration: none;
}
</style>
