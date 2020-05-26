<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{userContent}}</h3>
    </header>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
      this.$store.dispatch('fetchUserBoard')
  },
    computed: {
        userContent() {
            return this.$store.getters.getUserContent
        }
    }
};
</script>