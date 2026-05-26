import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { ProductDetail } from "../../types";
import { useProductOptions } from "./use-product-options";

const baseProduct = {
  id: "product-1",
  name: "Vestido Midi Seda Rose",
  slug: "vestido-midi-seda-rose",
  price: 489,
  status: "AVAILABLE",
  sizes: ["P", "M"],
} satisfies ProductDetail;

function makeProduct(overrides: Partial<ProductDetail> = {}): ProductDetail {
  return {
    ...baseProduct,
    ...overrides,
  };
}

describe("useProductOptions", () => {
  it("uses product sizes and fallback colors when variants are not available", () => {
    const { result } = renderHook(() => useProductOptions(makeProduct()));

    expect(result.current.uniqueSizes).toEqual(["P", "M"]);
    expect(result.current.uniqueColors).toEqual(["Rosé Divine", "Preto", "Branco"]);
    expect(result.current.selectedSize).toBe("P");
    expect(result.current.selectedColor).toBe("Rosé Divine");
    expect(result.current.isAvailable).toBe(true);
    expect(result.current.stockQuantity).toBe(10);
  });

  it("updates availability and stock from the selected variant", () => {
    const product = makeProduct({
      variants: [
        { id: "variant-1", size: "P", color: "Preto", stockQuantity: 0, isAvailable: true },
        { id: "variant-2", size: "M", color: "Preto", stockQuantity: 4, isAvailable: true },
        { id: "variant-3", size: "M", color: "Branco", stockQuantity: 1, isAvailable: false },
      ],
    });

    const { result } = renderHook(() => useProductOptions(product));

    expect(result.current.currentVariant?.id).toBe("variant-1");
    expect(result.current.isAvailable).toBe(false);
    expect(result.current.stockQuantity).toBe(0);

    act(() => result.current.selectSize("M"));

    expect(result.current.currentVariant?.id).toBe("variant-2");
    expect(result.current.isAvailable).toBe(true);
    expect(result.current.stockQuantity).toBe(4);

    act(() => result.current.selectColor("Branco"));

    expect(result.current.currentVariant?.id).toBe("variant-3");
    expect(result.current.isAvailable).toBe(false);
    expect(result.current.stockQuantity).toBe(1);
  });

  it("marks combinations without a variant as unavailable", () => {
    const product = makeProduct({
      totalStock: 9,
      variants: [
        { id: "variant-1", size: "P", color: "Preto", stockQuantity: 2, isAvailable: true },
        { id: "variant-2", size: "M", color: "Branco", stockQuantity: 7, isAvailable: true },
      ],
    });

    const { result } = renderHook(() => useProductOptions(product));

    act(() => result.current.selectColor("Branco"));

    expect(result.current.currentVariant).toBeNull();
    expect(result.current.isAvailable).toBe(false);
    expect(result.current.stockQuantity).toBe(0);
  });
});
