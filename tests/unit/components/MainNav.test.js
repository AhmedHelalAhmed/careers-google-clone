import { render, screen } from "@testing-library/vue";
import MainNav from "@/components/MainNav.vue";
import userEvent from "@testing-library/user-event";

describe("MainNav", () => {
  it("displays company name", () => {
    render(MainNav);
    const companyName = screen.getByText("Bobo Careers");
    expect(companyName).toBeInTheDocument();
  });
  it("displays menu items for navigation", () => {
    render(MainNav);
    const navigationMenuItems = screen.getAllByRole("listitem");
    const navigationMenuText = navigationMenuItems.map(
      (navigationMenuItem) => navigationMenuItem.textContent
    );
    expect(navigationMenuText).toEqual([
      "Teams",
      "Locations",
      "Life at Bobo Corp",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });

  describe("When the user logs in", () => {
    it("displays user profile picture", async () => {
      render(MainNav);

      let profileImage = screen.queryByRole("img", {
        name: /User profile image/i,
      });
      expect(profileImage).not.toBeInTheDocument();

      const signInButton = screen.getByRole("button", {
        name: /sign in/i,
      });
      expect(signInButton.textContent.trim().toLowerCase()).toBe("sign in");

      await userEvent.click(signInButton);
      profileImage = screen.getByRole("img", {
        name: /User profile image/i,
      });
      expect(profileImage).toBeInTheDocument();
    });
  });
});
