import { createPinia, setActivePinia } from "pinia";
import { useDegreesStore } from "@/stores/degrees";
import type { Mock } from "vitest";
import axios from "axios";
import createDegree from "../../utils/createDegree";
vi.mock("axios");
const axiosGetMock = axios.get as Mock;
beforeEach(() => {
  setActivePinia(createPinia());
});
describe("state", () => {
  it("store all degrees that jobs may require", () => {
    const store = useDegreesStore();
    expect(store.degrees).toEqual([]);
  });
});

describe("actions", () => {
  describe("FETCH_DEGREES", async () => {
    it("make API request and stores received degrees", async () => {
      axiosGetMock.mockResolvedValue({
        data: [{ id: 1, degree: "degree1" }],
      });

      const store = useDegreesStore();
      await store.FETCH_DEGREES();
      expect(store.degrees).toEqual([{ id: 1, degree: "degree1" }]);
    });
  });
});

describe("getters", () => {
  describe("UNIQUE_DEGREES", () => {
    it("finds unique degrees from collection degrees", async () => {
      const store = useDegreesStore();
      store.degrees = [
        createDegree({ degree: "Master's" }),
        createDegree({ degree: "Bachelor's" }),
      ];
      const result = store.UNIQUE_DEGREES;
      expect(result).toEqual(["Master's", "Bachelor's"]);
    });
  });
});
