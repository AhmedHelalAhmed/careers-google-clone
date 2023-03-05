<template>
  <section class="mb-16">
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="actionClass" class="block">{{ action }}</span>
      for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your next job at Bobo Corp.</h2>
  </section>
</template>

<script lang="ts" setup>
import nextElementInList from "@/utils/nextElementInList";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const action = ref("Build");
const interval = ref<ReturnType<typeof setInterval>>();
const actionClass = computed(() => ({
  [action.value.toLowerCase()]: true,
}));
const changeTitle = () => {
  const actions = ["Build", "Create", "Design", "Code"];
  interval.value = setInterval(() => {
    action.value = nextElementInList(actions, action.value);
  }, 3000);
};
onMounted(changeTitle);
onBeforeUnmount(() => {
  clearInterval(interval.value);
});
</script>

<style scoped>
.build {
  color: #1a73e8;
}

.create {
  color: #34a853;
}

.design {
  color: #f9ab00;
}

.code {
  color: #d93025;
}
</style>
