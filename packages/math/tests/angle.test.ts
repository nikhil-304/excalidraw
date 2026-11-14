import { describe, expect, it } from "vitest";

import { normalizeRadians } from "../src/angle";

import type { Radians } from "../src/types";

const TWO_PI = 2 * Math.PI;
const rad = (value: number) => value as Radians;

describe("normalizeRadians", () => {
  it("keeps angles in [0, 2π) for non-negative input", () => {
    expect(normalizeRadians(rad(0))).toBe(0);
    expect(normalizeRadians(rad(Math.PI))).toBe(Math.PI);
    expect(normalizeRadians(rad(2 * Math.PI))).toBe(0);
    expect(normalizeRadians(rad(3 * Math.PI))).toBeCloseTo(Math.PI, 12);
  });

  it("returns 0 for negative multiples of 2π, not 2π", () => {
    expect(normalizeRadians(rad(-2 * Math.PI))).toBe(0);
    expect(normalizeRadians(rad(-4 * Math.PI))).toBe(0);
  });

  it("never returns 2π for tiny negative angles", () => {
    const result = normalizeRadians(rad(-1e-17));
    expect(result).toBeLessThan(TWO_PI);
    expect(result === 0 || result > TWO_PI - 1e-9).toBe(true);
  });

  it("normalizes ordinary negative angles into [0, 2π)", () => {
    expect(normalizeRadians(rad(-Math.PI / 2))).toBeCloseTo(
      (3 * Math.PI) / 2,
      12,
    );
    expect(normalizeRadians(rad(-Math.PI))).toBeCloseTo(Math.PI, 12);
    expect(normalizeRadians(rad(-0.5))).toBeCloseTo(TWO_PI - 0.5, 12);
  });

  it("gives the same result for the same direction, positive or negative", () => {
    expect(normalizeRadians(rad(-2 * Math.PI))).toBe(normalizeRadians(rad(0)));
    expect(normalizeRadians(rad(-Math.PI / 2 - 2 * Math.PI))).toBeCloseTo(
      normalizeRadians(rad(-Math.PI / 2)),
      12,
    );
  });
});
