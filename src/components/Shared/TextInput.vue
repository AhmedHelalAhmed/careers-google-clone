<template>
  <input
    :value="value"
    type="text"
    placeholder="Los Angeles"
    class="w-full text-lg font-normal focus:outline-none"
    @input="handleInput"
  />
</template>

<script>
export default {
  name: "TextInput",
  emits: ["handleInput"],
  data() {
    return {
      value: "",
    };
  },
  methods: {
    handleInput($event) {
      this.value = $event.target.value;
      this.$emit("handleInput", this.value);
    },
  },
};
</script>

<style scoped></style>
