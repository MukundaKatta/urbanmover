import { describe, it, expect } from "vitest";
import { Urbanmover } from "../src/core.js";
describe("Urbanmover", () => {
  it("init", () => { expect(new Urbanmover().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Urbanmover(); await c.process(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Urbanmover(); await c.process(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
