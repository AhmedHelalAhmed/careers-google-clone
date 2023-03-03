<template>
  <div class="w-full border-b border-solid">
    <div class="mx-auto my-16 text-center">
      <slot name="title">sample title</slot>
      <slot name="subtitle">sample subtitle</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderContainer",
};
</script>

<style scoped></style>
