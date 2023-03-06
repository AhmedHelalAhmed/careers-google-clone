<template>
  <div class="mt-5">
    <fieldset>
      <ul class="flex flex-row flex-wrap">
        <li v-for="value in uniqueValues" :key="value" class="h-8 w-1/2">
          <input
            :id="value"
            v-model="selectedValues"
            :value="value"
            class="mr-3"
            type="checkbox"
            @change="selectValue"
          />
          <label :for="value">{{ value }}</label>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore, CLEAR_USER_JOB_FILTER_SELECTIONS } from "@/stores/user";

const props = defineProps({
  uniqueValues: {
    type: [Array<string>, Set<string>],
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
});
const selectedValues = ref<string[]>([]);
const router = useRouter();
const selectValue = () => {
  props.action(selectedValues.value);
  router.push({ name: "jobResults" });
};

const userStore = useUserStore();
// to solve the side effect of clearing the user job filter selections
// we have two points of truth!
userStore.$onAction(({ after, name }) => {
  after(() => {
    if (name === CLEAR_USER_JOB_FILTER_SELECTIONS) {
      selectedValues.value = [];
    }
  });
});
</script>
