<template>
  <img
    class="h-8 w-8 rounded-3xl object-contain"
    :src="imageLink"
    alt="User profile image"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Data {
  imageLink: string;
}

export default defineComponent({
  name: "ProfileImage",
  data(): Data {
    return {
      imageLink:
        "https://www.pngitem.com/pimgs/m/487-4876417_link-head-png-toon-link-face-png-transparent.png",
    };
  },
});
</script>
