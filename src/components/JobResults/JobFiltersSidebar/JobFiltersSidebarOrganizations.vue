<template>
  <job-filter-sidebar-check-box-group
    :action="userStore.ADD_SELECTED_ORGANIZATIONS"
    :unique-values="UNIQUE_ORGANIZATIONS"
  >
  </job-filter-sidebar-check-box-group>
</template>

<script lang="ts" setup>
import JobFilterSidebarCheckBoxGroup from "@/components/JobResults/JobFiltersSidebar/JobFilterSidebarCheckBoxGroup.vue";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";
import { useJobsStore } from "@/stores/jobs";
const userStore = useUserStore();
const jobsStore = useJobsStore();
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS);
</script>
