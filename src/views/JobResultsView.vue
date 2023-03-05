<template>
  <div class="flex flex-row flex-row flex-nowrap">
    <job-filters-sidebar></job-filters-sidebar>
    <job-listings></job-listings>
  </div>
</template>

<script lang="ts" setup>
import JobFiltersSidebar from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebar.vue";
import JobListings from "@/components/JobResults/JobListings.vue";
</script>
