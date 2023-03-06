import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import userEvent from "@testing-library/user-event";

import { useUserStore } from "@/stores/user";
import { describe } from "vitest";
import JobFiltersSidebarPrompt from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarPrompt.vue";
import JobFiltersSidebarSkills from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarSkills.vue";

describe("JobFiltersSidebarSkills", () => {
  const renderJobFiltersSidebarSkills = () => {
    const pinia = createTestingPinia();
    const userStore = useUserStore();
    render(JobFiltersSidebarSkills, {
      global: {
        plugins: [pinia],
      },
    });

    return {
      userStore,
    };
  };
  it("populates search input from store", async () => {
    const { userStore } = renderJobFiltersSidebarSkills();
    userStore.skillsSearchTerm = "Programmer";

    const input = await screen.findByRole<HTMLInputElement>("textbox");
    expect(input.value).toBe("Programmer");
  });

  it("writes user input to store", async () => {
    const { userStore } = renderJobFiltersSidebarSkills();
    userStore.skillsSearchTerm = "";
    const input = screen.getByRole<HTMLInputElement>("textbox");
    await userEvent.type(input, "V");
    await userEvent.click(document.body);
    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith("V");
  });

  it("removes whitespace from user input", async () => {
    const { userStore } = renderJobFiltersSidebarSkills();
    userStore.skillsSearchTerm = "";
    const input = screen.getByRole<HTMLInputElement>("textbox");
    await userEvent.type(input, "      Vue developer     ");
    await userEvent.click(document.body);
    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith(
      "Vue developer"
    );
  });
});
