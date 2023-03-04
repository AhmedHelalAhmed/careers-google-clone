import nextElementInList from "@/utils/nextElementInList";

describe("nextElementInList", () => {
  it("locates element in list and returns the next element in list", () => {
    const list = ["A", "B", "C", "D", "E"];
    const value = "C";
    const result = nextElementInList(list, value);
    expect(result).toBe("D");
  });

  describe("when element is at the end of the list", () => {
    it("locates next element at start of list", () => {
      const list = ["A", "B", "C", "D", "E"];
      const value = "E";
      const result = nextElementInList(list, value);
      expect(result).toBe("A");
    });
  });

  describe("when the list is empty", () => {
    it("locates undefined", () => {
      const list = [] as string[];
      const value = "A";
      const result = nextElementInList(list, value);
      expect(result).toBe(undefined);
    });
  });
});
