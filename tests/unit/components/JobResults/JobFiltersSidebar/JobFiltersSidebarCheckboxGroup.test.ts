import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import userEvent from "@testing-library/user-event";
import { useRouter } from "vue-router";
import JobFilterSidebarCheckBoxGroup from "@/components/JobResults/JobFiltersSidebar/JobFilterSidebarCheckBoxGroup.vue";
import type { Mock } from "vitest";
import { useUserStore } from "@/stores/user";
import { describe } from "vitest";

vi.mock("vue-router");

const useRouterMock = useRouter as Mock;
describe("JobFilterSidebarCheckBoxGroup", () => {
  interface JobFiltersSidebarCheckboxGroupProps {
    uniqueValues: Set<string>;
    action: Mock;
  }

  const createProps = (
    props: Partial<JobFiltersSidebarCheckboxGroupProps> = {}
  ): JobFiltersSidebarCheckboxGroupProps => {
    return {
      uniqueValues: new Set(["ValueA", "ValueB"]),
      action: vi.fn(),
      ...props,
    };
  };
  const renderJobFilterSidebarCheckBoxGroup = (
    props: JobFiltersSidebarCheckboxGroupProps
  ) => {
    const pinia = createTestingPinia({ stubActions: false }); // actions will not mocked
    const userStore = useUserStore();
    render(JobFilterSidebarCheckBoxGroup, {
      props: { ...props },
      global: {
        plugins: [pinia],
      },
    });
    return { userStore };
  };

  it("renders unique list of values", () => {
    const props = createProps({
      uniqueValues: new Set(["Full-time", "Part-time"]),
    });
    renderJobFilterSidebarCheckBoxGroup(props);
    const jobTypesListItems = screen.getAllByRole("listitem");
    const jobTypes = jobTypesListItems.map((item) => item.textContent);
    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  });
  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for value", async () => {
      useRouterMock.mockReturnValue({ push: vi.fn() });
      const action = vi.fn();
      const props = createProps({
        uniqueValues: new Set(["Full-time", "Part-time"]),
        action,
      });
      renderJobFilterSidebarCheckBoxGroup(props);

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);
      expect(action).toHaveBeenCalledWith(["Full-time"]);
    });

    it("navigate user to job results page to see fresh batch of filtered jobs", async () => {
      const push = vi.fn();
      useRouterMock.mockReturnValue({ push });
      const props = createProps({
        uniqueValues: new Set(["Full-time"]),
      });
      renderJobFilterSidebarCheckBoxGroup(props);
      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);
      expect(push).toHaveBeenCalledWith({ name: "jobResults" });
    });
  });

  describe("when user clears job filters", () => {
    it("uncheck any checked checkboxes", async () => {
      useRouterMock.mockReturnValue({ push: vi.fn() });
      const props = createProps({
        uniqueValues: new Set(["Full-time"]),
      });
      const { userStore } = renderJobFilterSidebarCheckBoxGroup(props);
      const fullTimeCheckboxBeforeAction = screen.getByRole<HTMLInputElement>(
        "checkbox",
        {
          name: /full-time/i,
        }
      );
      await userEvent.click(fullTimeCheckboxBeforeAction);
      expect(fullTimeCheckboxBeforeAction.checked).toBe(true);
      // we must real pinia to run here
      userStore.CLEAR_USER_JOB_FILTER_SELECTIONS();

      const fullTimeCheckboxAfterAction =
        await screen.findByRole<HTMLInputElement>("checkbox", {
          name: /full-time/i,
        });
      expect(fullTimeCheckboxAfterAction.checked).toBe(false);
    });
  });
});
