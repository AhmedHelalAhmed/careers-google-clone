import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import userEvent from "@testing-library/user-event";

describe("JobFiltersSidebarOrganizations", () => {
  const renderJobFiltersSidebarOrganizations = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    const userStore = useUserStore();
    const $router = {
      push: vi.fn(),
    };
    render(JobFiltersSidebarOrganizations, {
      global: {
        mocks: {
          $router,
        },
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
    return { jobsStore, userStore, $router };
  };

  it("renders unique list of organizations from jobs", async () => {
    const { jobsStore } = renderJobFiltersSidebarOrganizations();
    jobsStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Amazon"]);
    const button = screen.getByRole("button", {
      name: /organizations/i,
    });
    await userEvent.click(button);
    const organizationsListItems = screen.getAllByRole("listitem");
    const organizations = organizationsListItems.map(
      (item) => item.textContent
    );
    expect(organizations).toEqual(["Google", "Amazon"]);
  });
  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for organization", async () => {
      const { jobsStore, userStore } = renderJobFiltersSidebarOrganizations();
      jobsStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Amazon"]);

      const button = screen.getByRole("button", {
        name: /organizations/i,
      });
      await userEvent.click(button);

      const googleCheckbox = screen.getByRole("checkbox", {
        name: /google/i,
      });
      await userEvent.click(googleCheckbox);
      expect(userStore.ADD_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith([
        "Google",
      ]);
    });
    it("navigate user to job results page to see fresh batch of filtered jobs", async () => {
      const { jobsStore, $router } = renderJobFiltersSidebarOrganizations();
      jobsStore.UNIQUE_ORGANIZATIONS = new Set(["Google"]);

      const button = screen.getByRole("button", {
        name: /organizations/i,
      });
      await userEvent.click(button);

      const googleCheckbox = screen.getByRole("checkbox", {
        name: /google/i,
      });
      await userEvent.click(googleCheckbox);
      expect($router.push).toHaveBeenCalledWith({ name: "jobResults" });
    });
  });
});
