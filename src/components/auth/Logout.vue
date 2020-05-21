<template>
  <div></div>
</template>

<script>
    export default {
        name: "Logout",
        created() {
            this.$store.dispatch('destroyToken')
            .then(() => {
                this.$router.push('/login')
            })
        }

    }
</script>

<style scoped>

</style>