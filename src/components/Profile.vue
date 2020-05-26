<template>
  <v-container>
    <v-layout column>
      <v-card>
        <v-card-text>
          <v-flex class="mb-4">
            <v-avatar size="96" class="mr-4">
              <img src="https://randomuser.me/api/portraits/women/43.jpg" />
            </v-avatar>
          </v-flex>
          <v-text-field
            label="token"
          >{{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}</v-text-field>
          <v-text-field label="id" v-model="currentUser.id" />
          <v-text-field label="email" v-model="currentUser.email" />
          <v-list flat>
            <v-subheader>Authorities</v-subheader>
            <v-list-item v-for="(role,index) in currentUser.roles" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{role}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  }
};
</script>