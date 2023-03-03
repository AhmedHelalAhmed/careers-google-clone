<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing
        v-for="job in displayedJobs"
        :key="job.id"
        :job="job"
      ></job-listing>
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>
        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            role="link"
            :to="{ name: 'jobResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Previous
          </router-link>
          <router-link
            v-if="nextPage"
            role="link"
            :to="{ name: 'jobResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Next
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import JobListing from "@/components/JobResults/JobListing.vue";
import axios from "axios";

export default {
  name: "JobListings",
  components: { JobListing },
  data() {
    return {
      jobs: [],
      pageSize: 10,
    };
  },
  computed: {
    currentPage() {
      return Number.parseInt(this.$route.query.page || "1");
    },
    nextPage() {
      const nextPage = this.currentPage + 1;
      const MaxPage = Math.ceil(this.jobs.length / this.pageSize);
      return nextPage <= MaxPage ? nextPage : undefined;
    },
    previousPage() {
      const previousPage = this.currentPage - 1;
      const firstPage = 1;
      return previousPage >= firstPage ? previousPage : undefined;
    },
    displayedJobs() {
      const firstJobIndex = (this.currentPage - 1) * this.pageSize;
      const lastJobIndex = this.currentPage * this.pageSize;
      return this.jobs.slice(firstJobIndex, lastJobIndex);
    },
  },
  async mounted() {
    const response = await axios.get("http://127.0.0.1:3000/jobs");
    this.jobs = response.data;
  },
};
</script>

<style scoped></style>
