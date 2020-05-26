<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{moderatorContent}}</h3>
    </header>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
    };
  },
  mounted() {
      this.$store.dispatch('fetchModeratorBoard')
  },
    computed: {
      moderatorContent() {
          return this.$store.getters.getModeratorContent
      }
    }
};
</script>