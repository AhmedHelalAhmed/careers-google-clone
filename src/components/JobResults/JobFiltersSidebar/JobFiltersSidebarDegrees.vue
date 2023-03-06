<template>
  <job-filter-sidebar-check-box-group
    :action="userStore.ADD_SELECTED_DEGREES"
    :unique-values="UNIQUE_DEGREES"
    header="Degrees"
  >
  </job-filter-sidebar-check-box-group>
</template>

<script lang="ts" setup>
import JobFilterSidebarCheckBoxGroup from "@/components/JobResults/JobFiltersSidebar/JobFilterSidebarCheckBoxGroup.vue";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";
import { useDegreesStore } from "@/stores/degrees";
const userStore = useUserStore();
const degreesStore = useDegreesStore();
const UNIQUE_DEGREES = computed(() => degreesStore.UNIQUE_DEGREES);
</script>
