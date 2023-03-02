import { render, screen } from "@testing-library/vue";
import JobListing from "@/components/JobResults/JobListing.vue";
import { RouterLinkStub } from "@vue/test-utils";

describe("JobListing", () => {
  const createJobProps = (jobProps = {}) => ({
    title: "Vue Developer",
    organization: "VueTube",
    locations: ["Buenos Aires", "Oslo"],
    qualifications: [
      "Mesh granular deliverables, engineer enterprise convergence, and synergize B2C initiatives",
      "Morph bricks-and-clicks relationships, whiteboard one-to-one experiences, and innovate distributed schemas",
      "Drive intuitive deliverables, exploit vertical users, and optimize interactive e-commerce",
      "Embrace sticky infrastructures, incubate B2C portals, and drive killer applications",
    ],
    ...jobProps,
  });
  const renderJobListing = (jobProps) => {
    render(JobListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
      props: {
        job: {
          ...jobProps,
        },
      },
    });
  };

  it("renders job title", () => {
    const title = "Vue Developer";
    const jobProps = createJobProps({
      title,
    });
    renderJobListing(jobProps);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("renders job organization", () => {
    const organization = "VueTube";
    const jobProps = createJobProps({
      organization,
    });
    renderJobListing(jobProps);
    expect(screen.getByText(organization)).toBeInTheDocument();
  });

  it("renders job locations", () => {
    const locations = ["Buenos Aires", "Oslo"];
    const jobProps = createJobProps({
      locations,
    });
    renderJobListing(jobProps);
    for (const location of locations) {
      expect(screen.getByText(location)).toBeInTheDocument();
    }
  });

  it("renders job qualifications", () => {
    const qualifications = [
      "Mesh granular deliverables, engineer enterprise convergence, and synergize B2C initiatives",
      "Morph bricks-and-clicks relationships, whiteboard one-to-one experiences, and innovate distributed schemas",
      "Drive intuitive deliverables, exploit vertical users, and optimize interactive e-commerce",
      "Embrace sticky infrastructures, incubate B2C portals, and drive killer applications",
    ];
    const jobProps = createJobProps({
      minimumQualifications: qualifications,
    });
    renderJobListing(jobProps);
    for (const qualification of qualifications) {
      expect(screen.getByText(qualification)).toBeInTheDocument();
    }
  });
});
