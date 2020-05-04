<template>
  <div></div>
</template>

<script>
    export default {
        name: "Logout",
        created() {
            this.$store.dispatch('destroyToken')
                // eslint-disable-next-line no-unused-vars
            .then(response => {
                this.$router.push('/login')
            })
        }

    }
</script>

<style scoped>

</style>