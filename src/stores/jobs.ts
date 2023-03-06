import { defineStore } from "pinia";
import getJobs from "@/api/getJobs";
import { useUserStore } from "@/stores/user";
import type { Job } from "@/api/types";
import { computed, ref } from "vue";

export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQUE_ORGANIZATIONS = "UNIQUE_ORGANIZATIONS";
export const UNIQUE_JOB_TYPES = "UNIQUE_JOB_TYPES";

export const FILTERED_JOBS = "FILTERED_JOBS";
export const INCLUDE_JOB_BY_JOB_TYPE = "INCLUDE_JOB_BY_JOB_TYPE";
export const INCLUDE_JOB_BY_ORGANIZATION = "INCLUDE_JOB_BY_ORGANIZATION";
export const INCLUDE_JOB_BY_DEGREE = "INCLUDE_JOB_BY_DEGREE";
export const INCLUDE_JOB_BY_SKILL = "INCLUDE_JOB_BY_SKILL";
export const useJobsStore = defineStore("jobs", () => {
  const jobs = ref<Job[]>([]);
  const FETCH_JOBS = async () => {
    jobs.value = await getJobs();
  };
  const UNIQUE_ORGANIZATIONS = computed(() => {
    const uniqueOrganizations = new Set<string>();
    jobs.value.forEach((job) => uniqueOrganizations.add(job.organization));
    return uniqueOrganizations;
  });
  const UNIQUE_JOB_TYPES = computed(() => {
    const uniqueJobTypes = new Set<string>();
    jobs.value.forEach((job) => uniqueJobTypes.add(job.jobType));
    return uniqueJobTypes;
  });
  const INCLUDE_JOB_BY_ORGANIZATION = (job: Job) => {
    const userStore = useUserStore();
    if (userStore.selectedOrganizations.length === 0) {
      return true;
    }
    return userStore.selectedOrganizations.includes(job.organization);
  };
  const INCLUDE_JOB_BY_JOB_TYPE = (job: Job) => {
    const userStore = useUserStore();
    if (userStore.selectedJobTypes.length === 0) {
      return true;
    }
    return userStore.selectedJobTypes.includes(job.jobType);
  };
  const INCLUDE_JOB_BY_DEGREE = (job: Job) => {
    const userStore = useUserStore();
    if (userStore.selectedDegrees.length === 0) {
      return true;
    }
    return userStore.selectedDegrees.includes(job.degree);
  };
  const INCLUDE_JOB_BY_SKILL = (job: Job) => {
    const userStore = useUserStore();
    return job.title
      .toLowerCase()
      .includes(userStore.skillsSearchTerm.toLowerCase());
  };
  const FILTERED_JOBS = computed(() => {
    return jobs.value
      .filter((job: Job) => INCLUDE_JOB_BY_ORGANIZATION(job))
      .filter((job: Job) => INCLUDE_JOB_BY_JOB_TYPE(job))
      .filter((job: Job) => INCLUDE_JOB_BY_DEGREE(job))
      .filter((job: Job) => INCLUDE_JOB_BY_SKILL(job));
  });
  return {
    jobs,
    FETCH_JOBS,
    UNIQUE_ORGANIZATIONS,
    UNIQUE_JOB_TYPES,
    INCLUDE_JOB_BY_ORGANIZATION,
    INCLUDE_JOB_BY_JOB_TYPE,
    INCLUDE_JOB_BY_DEGREE,
    INCLUDE_JOB_BY_SKILL,
    FILTERED_JOBS,
  };
});
