import { render, screen } from "@testing-library/vue";
import TheSubnav from "@/components/Navigation/TheSubnav.vue";
import { createTestingPinia } from "@pinia/testing";
import { useJobsStore } from "@/stores/jobs";
import { useRoute } from "vue-router";
import type { Mock } from "vitest";

vi.mock("vue-router");
const useRouteMock = useRoute as Mock;
describe("TheSubnav", () => {
  const renderSubNav = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();

    render(TheSubnav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
    return { jobsStore };
  };
  describe("when user is on jobs page", () => {
    it("displays job count", async () => {
      useRouteMock.mockReturnValue({
        name: "jobResults",
      });
      const { jobsStore } = renderSubNav();
      const numberOfJobs = 16;
      // @ts-expect-error: Getter is read only
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});

      const jobCount = await screen.findByText(numberOfJobs);
      expect(jobCount).toBeInTheDocument();
    });
  });
  describe("when user is not on jobs page", () => {
    it("does not displays job count", () => {
      useRouteMock.mockReturnValue({
        name: "home",
      });
      const { jobsStore } = renderSubNav();
      const numberOfJobs = 16;
      // @ts-expect-error: Getter is read only
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});

      const jobCount = screen.queryByText(numberOfJobs);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
