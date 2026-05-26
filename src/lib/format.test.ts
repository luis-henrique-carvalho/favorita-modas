import { describe, expect, it } from "vitest";
import { formatCurrency } from "./format";

describe("formatCurrency", () => {
  it("formats numeric and string prices in BRL", () => {
    expect(formatCurrency(189.9)).toBe("R$ 189,90");
    expect(formatCurrency("489.90")).toBe("R$ 489,90");
  });

  it("uses a safe fallback for invalid values", () => {
    expect(formatCurrency("not-a-price")).toBe("R$ 0,00");
  });
});
