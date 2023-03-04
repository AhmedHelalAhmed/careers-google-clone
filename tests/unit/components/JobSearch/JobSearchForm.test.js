import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import JobSearchForm from "@/components/JobSearch/JobSearchForm.vue";
import { useRouter } from "vue-router";

vi.mock("vue-router");
describe("JobSearchForm", () => {
  describe("when user submits form", () => {
    it("directs user to job results page withe user's parameters", async () => {
      const push = vi.fn();
      useRouter.mockReturnValue({ push });
      render(JobSearchForm, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });

      const roleInput = screen.getByRole("textbox", { name: /role/i });
      await userEvent.type(roleInput, "Vue developer");

      const locationInput = screen.getByRole("textbox", { name: /where?/i });
      await userEvent.type(locationInput, "Dallas");

      const submitButton = screen.getByRole("button", { name: /search/i });
      await userEvent.click(submitButton);

      expect(push).toHaveBeenCalledWith({
        name: "jobResults",
        query: {
          role: "Vue developer",
          location: "Dallas",
        },
      });
    });
  });
});
