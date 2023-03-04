import { useJobsStore } from "@/stores/jobs";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import { useUserStore } from "@/stores/user";

vi.mock("axios");

beforeEach(() => {
  setActivePinia(createPinia());
});

describe("state", () => {
  it("store job listings", () => {
    const store = useJobsStore();
    expect(store.jobs).toEqual([]);
  });
});

describe("actions", () => {
  describe("FETCH_JOBS", () => {
    it("make API request and stores received jobs", async () => {
      axios.get.mockResolvedValue({
        data: ["job1", "job2"],
      });

      const store = useJobsStore();
      await store.FETCH_JOBS();
      expect(store.jobs).toEqual(["job1", "job2"]);
    });
  });
});

describe("getters", () => {
  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique organization from list of jobs", async () => {
      const store = useJobsStore();
      store.jobs = [
        { organization: "Google" },
        { organization: "Amazon" },
        { organization: "Google" },
      ];
      const result = store.UNIQUE_ORGANIZATIONS;
      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });
  describe("FILTERED_JOBS_BY_ORGANIZATIONS", () => {
    it("identifies jobs that are associated with the given organizations", () => {
      const jobStore = useJobsStore();
      jobStore.jobs = [
        { organization: "Google" },
        { organization: "Amazon" },
        { organization: "Microsoft" },
      ];
      const userStore = useUserStore();
      userStore.selectedOrganizations = ["Google", "Amazon"];

      const result = jobStore.FILTERED_JOBS_BY_ORGANIZATIONS;
      expect(result).toEqual([
        { organization: "Google" },
        { organization: "Amazon" },
      ]);
    });
    describe("when the user has not selected any organizations", () => {
      it("returns all jobs", () => {
        const jobStore = useJobsStore();
        jobStore.jobs = [
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Microsoft" },
        ];
        const userStore = useUserStore();
        userStore.selectedOrganizations = [];

        const result = jobStore.FILTERED_JOBS_BY_ORGANIZATIONS;
        expect(result).toEqual([
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Microsoft" },
        ]);
      });
    });
  });
  describe("FILTERED_JOBS_BY_JOB_TYPES", () => {
    it("identifies jobs that are associated with given job types", () => {
      const jobStore = useJobsStore();
      jobStore.jobs = [
        { jobType: "Full-time" },
        { jobType: "Temporary" },
        { jobType: "Part-time" },
      ];

      const userStore = useUserStore();
      userStore.selectedJobTypes = ["Full-time", "Part-time"];

      const result = jobStore.FILTERED_JOBS_BY_JOB_TYPES;

      expect(result).toEqual([
        { jobType: "Full-time" },
        { jobType: "Part-time" },
      ]);
    });

    describe("when the user has not selected any job types", () => {
      it("returns all jobs", () => {
        const jobStore = useJobsStore();
        jobStore.jobs = [
          { jobType: "Full-time" },
          { jobType: "Temporary" },
          { jobType: "Part-time" },
        ];

        const userStore = useUserStore();
        userStore.selectedJobTypes = [];

        const result = jobStore.FILTERED_JOBS_BY_JOB_TYPES;

        expect(result).toEqual([
          { jobType: "Full-time" },
          { jobType: "Temporary" },
          { jobType: "Part-time" },
        ]);
      });
    });
  });
});
