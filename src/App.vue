<template>
  <main-nav />
  <the-hero></the-hero>
</template>
<script>
import MainNav from "@/components/MainNav.vue";
import TheHero from "@/components/TheHero.vue";

export default {
  name: "App",
  components: {
    TheHero,
    MainNav,
  },
};
</script>
