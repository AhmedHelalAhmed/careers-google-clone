import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import userEvent from "@testing-library/user-event";
import { useRouter } from "vue-router";
import JobFilterSidebarCheckBoxGroup from "@/components/JobResults/JobFiltersSidebar/JobFilterSidebarCheckBoxGroup.vue";
import type { Mock } from "vitest";
vi.mock("vue-router");

const useRouterMock = useRouter as Mock;
describe("JobFilterSidebarCheckBoxGroup", () => {
  interface JobFiltersSidebarCheckboxGroupProps {
    header: string;
    uniqueValues: Set<string>;
    action: Mock;
  }
  const createProps = (
    props: Partial<JobFiltersSidebarCheckboxGroupProps> = {}
  ): JobFiltersSidebarCheckboxGroupProps => {
    return {
      header: "Some header",
      uniqueValues: new Set(["ValueA", "ValueB"]),
      action: vi.fn(),
      ...props,
    };
  };
  const renderJobFilterSidebarCheckBoxGroup = (
    props: JobFiltersSidebarCheckboxGroupProps
  ) => {
    const pinia = createTestingPinia();
    render(JobFilterSidebarCheckBoxGroup, {
      props: { ...props },
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
  };

  it("renders unique list of values", async () => {
    const props = createProps({
      header: "Job types",
      uniqueValues: new Set(["Full-time", "Part-time"]),
    });
    renderJobFilterSidebarCheckBoxGroup(props);
    const button = screen.getByRole("button", {
      name: /job types/i,
    });
    await userEvent.click(button);
    const jobTypesListItems = screen.getAllByRole("listitem");
    const jobTypes = jobTypesListItems.map((item) => item.textContent);
    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  });
  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for value", async () => {
      useRouterMock.mockReturnValue({ push: vi.fn() });
      const action = vi.fn();
      const props = createProps({
        header: "Job types",
        uniqueValues: new Set(["Full-time", "Part-time"]),
        action,
      });
      renderJobFilterSidebarCheckBoxGroup(props);

      const button = screen.getByRole("button", {
        name: /job types/i,
      });
      await userEvent.click(button);

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
        header: "Job types",
        uniqueValues: new Set(["Full-time"]),
      });
      renderJobFilterSidebarCheckBoxGroup(props);
      const button = screen.getByRole("button", {
        name: /job types/i,
      });
      await userEvent.click(button);
      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);
      expect(push).toHaveBeenCalledWith({ name: "jobResults" });
    });
  });
});
