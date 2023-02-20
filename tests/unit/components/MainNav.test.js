import { render, screen } from "@testing-library/vue";
import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  it("displays company name", function () {
    render(MainNav);
    const companyName = screen.getByText("Bobo Careers");
    expect(companyName).toBeInTheDocument();
  });
});
