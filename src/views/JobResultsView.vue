<template>
  <h1 class="text-6xl font-bold">Job Results page</h1>
  <button @click="goToHome">go to home</button>
</template>

<script>
export default {
  name: "JobResultsView",
  methods: {
    goToHome() {
      this.$router.push({
        name: "home",
      });
    },
  },
};
</script>

<style scoped></style>
