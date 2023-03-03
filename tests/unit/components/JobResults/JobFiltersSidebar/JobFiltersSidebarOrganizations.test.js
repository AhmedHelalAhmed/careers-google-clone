import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";
import { useJobsStore } from "@/stores/jobs";
import userEvent from "@testing-library/user-event";

describe("JobFiltersSidebarOrganizations", () => {
  it("renders unique list of organizations from jobs", async () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    jobsStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Amazon"]);
    render(JobFiltersSidebarOrganizations, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
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
});
