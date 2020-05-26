<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{adminContent}}</h3>
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
      this.$store.dispatch('fetchAdminBoard')
  },
    computed: {
        adminContent() {
            return this.$store.getters.getAdminContent
        }
    }
};
</script>