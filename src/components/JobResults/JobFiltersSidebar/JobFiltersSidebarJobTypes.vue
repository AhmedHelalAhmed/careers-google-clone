<template>
  <job-filter-sidebar-check-box-group
    :action="userStore.ADD_SELECTED_JOB_TYPES"
    :unique-values="UNIQUE_JOB_TYPES"
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
const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES);
</script>
