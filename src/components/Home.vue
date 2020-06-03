<template>
  <v-content>
    <NavBar />
    <v-container>
      <h3>{{publicContent}}</h3>
    </v-container>
  </v-content>

</template>

<script>
import NavBar from "./NavBar";
export default {
  name: 'Home',
    components: {NavBar},
    data() {
    return {
    };
  },
  mounted() {
      this.$store.dispatch('fetchPublicContent')
  },
    computed: {
        publicContent() {
            return this.$store.getters.getPublicContent
        }
    }
};
</script>