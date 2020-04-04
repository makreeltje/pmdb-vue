<template>
  <v-app>
    <div>
      <v-app-bar color="primary" dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>PMDB</v-toolbar-title>

        <v-spacer></v-spacer>

        <div v-if="!currentUser">
          <v-btn icon>
            <router-link to="/register">
              <v-icon>mdi-account-plus</v-icon>
            </router-link>
          </v-btn>
          <v-btn icon>
            <router-link to="/login">
              <v-icon>mdi-login</v-icon>
            </router-link>
          </v-btn>
        </div>

        <div v-if="currentUser">
          <v-btn icon>
            <router-link to="/profile" icon>
              <v-icon>mdi-account</v-icon>
            </router-link>
          </v-btn>
          <v-btn icon href @click.prevent="logOut">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </div>
        <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
      </v-app-bar>
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
  data: () => ({
      drawer: false,
    }),
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
  color: #ffffff;
  text-decoration: none;
}
</style>
