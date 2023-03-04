import { defineStore } from "pinia";

export const ADD_SELECTED_ORGANIZATIONS = "ADD_SELECTED_ORGANIZATIONS";
export const ADD_SELECTED_JOB_TYPES = "ADD_SELECTED_JOB_TYPES";

export interface UserState {
  isLoggedIn: boolean;
  selectedOrganizations: string[];
  selectedJobTypes: string[];
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    isLoggedIn: false,
    selectedOrganizations: [],
    selectedJobTypes: [],
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },
    [ADD_SELECTED_ORGANIZATIONS](selectedOrganizations: string[]) {
      this.selectedOrganizations = selectedOrganizations;
    },
    [ADD_SELECTED_JOB_TYPES](jobTypes: string[]) {
      this.selectedJobTypes = jobTypes;
    },
  },
});
