<template>
  <main-nav />
  <the-hero></the-hero>
</template>
<script>
import MainNav from "@/components/Navigation/MainNav.vue";
import TheHero from "@/components/JobSearch/TheHero.vue";

export default {
  name: "App",
  components: {
    TheHero,
    MainNav,
  },
};
</script>
