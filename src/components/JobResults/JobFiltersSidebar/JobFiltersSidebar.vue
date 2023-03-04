<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <action-button text="Clear filters" type="secondary"></action-button>
        </div>
      </div>
      <collapsible-accordion header="Degree"></collapsible-accordion>
      <job-filter-sidebar-check-box-group
        header="Job Types"
        :unique-values="UNIQUE_JOB_TYPES"
        :action="userStore.ADD_SELECTED_JOB_TYPES"
      ></job-filter-sidebar-check-box-group>
      <job-filter-sidebar-check-box-group
        header="Organizations"
        :unique-values="UNIQUE_ORGANIZATIONS"
        :action="userStore.ADD_SELECTED_ORGANIZATIONS"
      ></job-filter-sidebar-check-box-group>
    </section>
  </div>
</template>

<script setup>
import ActionButton from "@/components/Shared/ActionButton.vue";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import JobFilterSidebarCheckBoxGroup from "@/components/JobResults/JobFiltersSidebar/JobFilterSidebarCheckBoxGroup.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";

const jobsStore = useJobsStore();
const userStore = useUserStore();
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS);
const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES);
</script>

<style scoped></style>
