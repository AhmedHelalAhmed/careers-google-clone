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
        :action="userStore.ADD_SELECTED_JOB_TYPES"
        :unique-values="UNIQUE_JOB_TYPES"
        header="Job Types"
      ></job-filter-sidebar-check-box-group>
      <job-filter-sidebar-check-box-group
        :action="userStore.ADD_SELECTED_ORGANIZATIONS"
        :unique-values="UNIQUE_ORGANIZATIONS"
        header="Organizations"
      ></job-filter-sidebar-check-box-group>
    </section>
  </div>
</template>

<script lang="ts" setup>
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
