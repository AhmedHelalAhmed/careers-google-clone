import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import userEvent from "@testing-library/user-event";
import { useRouter } from "vue-router";
import JobFilterSidebarCheckBoxGroup from "@/components/JobResults/JobFiltersSidebar/JobFilterSidebarCheckBoxGroup.vue";
import type { Mock } from "vitest";
import { useUserStore } from "@/stores/user";
import { describe } from "vitest";
import JobFiltersSidebarPrompt from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarPrompt.vue";

vi.mock("vue-router");

const useRouterMock = useRouter as Mock;
describe("JobFiltersSidebarPrompt", () => {
  describe("when user clicks clear filters button", () => {
    it("sends message to clear all of user's job search filters", async () => {
      const pinia = createTestingPinia();
      const userStore = useUserStore();
      render(JobFiltersSidebarPrompt, {
        global: {
          plugins: [pinia],
        },
      });
      const button = screen.getByRole("button", { name: /clear filters/i });
      await userEvent.click(button);

      expect(userStore.CLEAR_USER_JOB_FILTER_SELECTIONS).toHaveBeenCalled();
    });
  });
});
