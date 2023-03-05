import type { Job } from "@/api/types";

const createJob = (job: Partial<Job> = {}): Job => ({
  id: 1,
  title: "Go Supervisor",
  organization: "Vue and a Half Men",
  degree: "Bachelor's",
  jobType: "Intern",
  locations: ["Barcelona"],
  minimumQualifications: ["E-enable best-of-breed solutions"],
  preferredQualifications: ["Cultivate open-source networks"],
  description: ["Responsibility item senior later attorney."],
  dateAdded: "2021-02-01",
  ...job,
});

export default createJob;
