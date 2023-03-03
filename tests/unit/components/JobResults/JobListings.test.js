import { render, screen } from "@testing-library/vue";
import JobListings from "@/components/JobResults/JobListings.vue";
import axios from "axios";
import { RouterLinkStub } from "@vue/test-utils";

vi.mock("axios");
describe("JobListings", () => {
  const createRoute = (queryParams = {}) => {
    return {
      query: {
        ...queryParams,
      },
    };
  };

  const renderJobListings = ($route) => {
    render(JobListings, {
      global: {
        mocks: {
          $route,
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
  };

  it("fetches jobs", () => {
    axios.get.mockResolvedValue({
      data: [],
    });
    const $route = createRoute({
      page: "5",
    });
    renderJobListings($route);

    expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/jobs");
  });

  it("displays maximum of 10 jobs", async () => {
    axios.get.mockResolvedValue({
      data: Array(15).fill({}),
    });
    const $route = createRoute();
    renderJobListings($route);
    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
  });

  describe("when params exclude page number", () => {
    it("displays page number 1", () => {
      axios.get.mockResolvedValue({
        data: Array(15).fill({}),
      });
      const $route = createRoute({
        page: undefined,
      });
      renderJobListings($route);
      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("when params include page number", () => {
    it("displays page number", () => {
      axios.get.mockResolvedValue({
        data: Array(15).fill({}),
      });
      const $route = createRoute({
        page: "3",
      });
      renderJobListings($route);
      expect(screen.getByText("Page 3")).toBeInTheDocument();
    });
  });
  describe("when user is on first page", () => {
    it("does not show link to previous page", async () => {
      axios.get.mockResolvedValue({
        data: Array(15).fill({}),
      });
      const $route = createRoute({
        page: "1",
      });
      renderJobListings($route);

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", {
        name: /previous/i,
      });
      expect(previousLink).not.toBeInTheDocument();
    });

    it("show link to next page", async () => {
      axios.get.mockResolvedValue({
        data: Array(15).fill({}),
      });
      const $route = createRoute({
        page: "1",
      });
      renderJobListings($route);
      await screen.findAllByRole("listitem");
      // a tag without href will not consider a link so we need to add role=link on the element
      const nextLink = screen.queryByRole("link", {
        name: /next/i,
      });
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe("when user is on last page", () => {
    it("does not show link to next page", async () => {
      axios.get.mockResolvedValue({
        data: Array(15).fill({}),
      });
      const $route = createRoute({
        page: "2",
      });
      renderJobListings($route);
      await screen.findAllByRole("listitem");
      // a tag without href will not consider a link se we need to add role=link on the element
      const nextLink = screen.queryByRole("link", {
        name: /next/i,
      });
      expect(nextLink).not.toBeInTheDocument();
    });
    it("show link to previous page", async () => {
      axios.get.mockResolvedValue({
        data: Array(15).fill({}),
      });
      const $route = createRoute({
        page: "2",
      });
      renderJobListings($route);
      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", {
        name: /previous/i,
      });
      expect(previousLink).toBeInTheDocument();
    });
  });
});
