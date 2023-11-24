import { multiply } from "../index.js";

xdescribe("test multiply", () => {
  it("multiply 1 * 0 to equal 0", () => {
    const result = multiply(1, 0);
    expect(result).toBe(0);
  }),
    it("multiply 1 * 1 to equal 1", () => {
      const result = multiply(1, 1);
      expect(result).toBe(1);
    });
});


import { celsiumToFarenheit } from "../index.js";

xdescribe("test convert", () => {
  it("100 Celsium is equal 212 Farenheit", () => {
    const result = celsiumToFarenheit(20);
    expect(result).toBe(212);
  }),
    it("0 Celsium is equal 32 Farenheit", () => {
      const result = celsiumToFarenheit(0);
      expect(result).toBe(32);
    });
    it("Absolute zero in Farenheit", () => {
      const result = celsiumToFarenheit(-280);
      expect(result).toBe(-460);
    });
});
