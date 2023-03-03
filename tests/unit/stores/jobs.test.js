import { FETCH_JOBS, useJobsStore } from "@/stores/jobs";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

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
