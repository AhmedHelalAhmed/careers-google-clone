import { cleanup } from "@testing-library/vue";
import matchers from "@testing-library/jest-dom/matchers";
import { expect, afterEach } from "vitest";

expect.extend(matchers);
// To ensure each test is isolated and independent
afterEach(() => {
  cleanup();
});
