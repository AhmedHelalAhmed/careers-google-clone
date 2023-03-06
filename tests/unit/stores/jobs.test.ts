import { useJobsStore } from "@/stores/jobs";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import { useUserStore } from "@/stores/user";
import type { Mock } from "vitest";
import createJob from "../../utils/createJob";
import createDegree from "../../utils/createDegree";
import { expect } from "vitest";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;
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
      axiosGetMock.mockResolvedValue({
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
        createJob({ organization: "Google" }),
        createJob({ organization: "Amazon" }),
        createJob({ organization: "Google" }),
      ];
      const result = store.UNIQUE_ORGANIZATIONS;
      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });
  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of jobs", async () => {
      const store = useJobsStore();
      store.jobs = [
        createJob({ jobType: "Full-time" }),
        createJob({ jobType: "Part-time" }),
        createJob({ jobType: "Temporary" }),
        createJob({ jobType: "Part-time" }),
        createJob({ jobType: "Part-time" }),
        createJob({ jobType: "Full-time" }),
      ];
      const result = store.UNIQUE_JOB_TYPES;
      expect(result).toEqual(new Set(["Full-time", "Part-time", "Temporary"]));
    });
  });

  describe("INCLUDE_JOB_BY_ORGANIZATION", () => {
    describe("when the user has not selected any organizations", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedOrganizations = [];
        const store = useJobsStore();
        const job = createJob({ organization: "Google" });
        const result = store.INCLUDE_JOB_BY_ORGANIZATION(job);
        expect(result).toBe(true);
      });
    });
    it("identifies if job is associated with given organizations", () => {
      const userStore = useUserStore();
      userStore.selectedOrganizations = ["Google", "Amazon"];
      const store = useJobsStore();
      const job = createJob({ organization: "Google" });
      const result = store.INCLUDE_JOB_BY_ORGANIZATION(job);
      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
    describe("when the user has not selected any job types", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedJobTypes = [];
        const store = useJobsStore();
        const job = createJob({ jobType: "Full-time" });
        const result = store.INCLUDE_JOB_BY_JOB_TYPE(job);
        expect(result).toBe(true);
      });
    });
    it("identifies if job is associated with given job types", () => {
      const userStore = useUserStore();
      userStore.selectedJobTypes = ["Full-time", "Part-time"];
      const store = useJobsStore();
      const job = createJob({ jobType: "Full-time" });
      const result = store.INCLUDE_JOB_BY_JOB_TYPE(job);
      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_DEGREE", () => {
    describe("when the user has not selected any degree", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedDegrees = [];
        const store = useJobsStore();
        const job = createJob();
        const result = store.INCLUDE_JOB_BY_DEGREE(job);
        expect(result).toBe(true);
      });
    });
    it("identifies if job is associated with given degrees", () => {
      const userStore = useUserStore();
      userStore.selectedDegrees = ["Master's"];
      const store = useJobsStore();
      const job = createJob({ degree: "Master's" });
      const result = store.INCLUDE_JOB_BY_DEGREE(job);
      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_SKILL", () => {
    it("identifies if job matches user's skill", () => {
      const userStore = useUserStore();
      userStore.skillsSearchTerm = "Vue";
      const store = useJobsStore();
      const job = createJob({ title: "Vue developer" });
      const result = store.INCLUDE_JOB_BY_SKILL(job);
      expect(result).toBe(true);
    });
    it("handles inconsistent character casing", () => {
      const userStore = useUserStore();
      userStore.skillsSearchTerm = "vuE";
      const store = useJobsStore();
      const job = createJob({ title: "vue developer" });
      const result = store.INCLUDE_JOB_BY_SKILL(job);
      expect(result).toBe(true);
    });

    describe("when the user has not entered any skill", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.skillsSearchTerm = "";
        const store = useJobsStore();
        const job = createJob({ title: "vue developer" });
        const result = store.INCLUDE_JOB_BY_SKILL(job);
        expect(result).toBe(true);
      });
    });
  });
});
