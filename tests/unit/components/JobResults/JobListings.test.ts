import { render, screen } from "@testing-library/vue";
import JobListings from "@/components/JobResults/JobListings.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useJobsStore } from "@/stores/jobs";
import { useRoute } from "vue-router";
import type { Mock } from "vitest";

vi.mock("vue-router");
const useRouteMock = useRoute as Mock;
describe("JobListings", () => {
  const renderJobListings = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    // @ts-expect-error: Getter is read only
    jobsStore.FILTERED_JOBS = Array(15).fill({});
    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
    return { jobsStore };
  };

  it("fetches jobs", () => {
    useRouteMock.mockReturnValue({
      query: {},
    });

    const { jobsStore } = renderJobListings();
    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled();
  });

  it("displays maximum of 10 jobs", async () => {
    useRouteMock.mockReturnValue({
      query: { page: "1" },
    });
    const { jobsStore } = renderJobListings();
    // @ts-expect-error: Getter is read only
    jobsStore.FILTERED_JOBS = Array(15).fill({});
    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
  });

  describe("when params exclude page number", () => {
    it("displays page number 1", () => {
      useRouteMock.mockReturnValue({
        query: { page: undefined },
      });
      renderJobListings();
      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("when params include page number", () => {
    it("displays page number", () => {
      useRouteMock.mockReturnValue({
        query: { page: "3" },
      });
      renderJobListings();
      expect(screen.getByText("Page 3")).toBeInTheDocument();
    });
  });
  describe("when user is on first page", () => {
    it("does not show link to previous page", async () => {
      useRouteMock.mockReturnValue({
        query: { page: "1" },
      });
      const { jobsStore } = renderJobListings();
      // @ts-expect-error: Getter is read only
      jobsStore.FILTERED_JOBS = Array(15).fill({});
      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", {
        name: /previous/i,
      });
      expect(previousLink).not.toBeInTheDocument();
    });

    it("show link to next page", async () => {
      useRouteMock.mockReturnValue({
        query: { page: "1" },
      });

      const { jobsStore } = renderJobListings();
      // @ts-expect-error: Getter is read only
      jobsStore.FILTERED_JOBS = Array(15).fill({});
      await screen.findAllByRole("listitem");
      // a tag without href will not consider a link so we need to add role=link on the element
      const nextLink = screen.queryByRole("link", {
        name: /next/i,
      });
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe("when user is on last page", () => {
    it("does not show link to next page", async () => {
      useRouteMock.mockReturnValue({
        query: { page: "2" },
      });

      const { jobsStore } = renderJobListings();
      // @ts-expect-error: Getter is read only
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      // a tag without href will not consider a link se we need to add role=link on the element
      const nextLink = screen.queryByRole("link", {
        name: /next/i,
      });
      expect(nextLink).not.toBeInTheDocument();
    });
    it("show link to previous page", async () => {
      useRouteMock.mockReturnValue({
        query: { page: "2" },
      });
      const { jobsStore } = renderJobListings();
      // @ts-expect-error: Getter is read only
      jobsStore.FILTERED_JOBS = Array(15).fill({});
      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", {
        name: /previous/i,
      });
      expect(previousLink).toBeInTheDocument();
    });
  });
});
