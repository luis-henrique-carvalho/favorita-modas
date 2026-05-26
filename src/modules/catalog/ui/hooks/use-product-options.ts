"use client";

import * as React from "react";
import type { ProductDetail } from "../../types";

const DEFAULT_SIZE = "M";
const DEFAULT_COLORS = ["Rosé Divine", "Preto", "Branco"];
const DEFAULT_STOCK_QUANTITY = 10;

function matchesOption(option: string, selectedOption: string) {
  return option.toLowerCase() === selectedOption.toLowerCase();
}

function resolveSelectedOption(options: string[], selectedOption: string | null, fallback: string) {
  if (selectedOption && options.some((option) => matchesOption(option, selectedOption))) {
    return selectedOption;
  }

  return options[0] || fallback;
}

export function useProductOptions(product: ProductDetail) {
  const uniqueSizes = React.useMemo(() => {
    if (product.variants && product.variants.length > 0) {
      return Array.from(new Set(product.variants.map((variant) => variant.size)));
    }

    return product.sizes || ["Único"];
  }, [product.sizes, product.variants]);

  const uniqueColors = React.useMemo(() => {
    if (product.variants && product.variants.length > 0) {
      return Array.from(new Set(product.variants.map((variant) => variant.color)));
    }

    return DEFAULT_COLORS;
  }, [product.variants]);

  const [selectedSizeState, setSelectedSize] = React.useState<string | null>(null);
  const [selectedColorState, setSelectedColor] = React.useState<string | null>(null);

  const selectedSize = React.useMemo(
    () => resolveSelectedOption(uniqueSizes, selectedSizeState, DEFAULT_SIZE),
    [selectedSizeState, uniqueSizes],
  );

  const selectedColor = React.useMemo(
    () => resolveSelectedOption(uniqueColors, selectedColorState, DEFAULT_COLORS[0]),
    [selectedColorState, uniqueColors],
  );

  const currentVariant = React.useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return null;
    }

    return (
      product.variants.find(
        (variant) =>
          matchesOption(variant.size, selectedSize) && matchesOption(variant.color, selectedColor),
      ) ?? null
    );
  }, [product.variants, selectedColor, selectedSize]);

  const isAvailable = React.useMemo(() => {
    if (product.status === "UNAVAILABLE") {
      return false;
    }

    if (product.variants && product.variants.length > 0) {
      return currentVariant
        ? currentVariant.isAvailable && currentVariant.stockQuantity > 0
        : false;
    }

    return product.totalStock === undefined || product.totalStock > 0;
  }, [currentVariant, product.status, product.totalStock, product.variants]);

  const stockQuantity = React.useMemo(() => {
    if (currentVariant) {
      return currentVariant.stockQuantity;
    }

    if (product.variants && product.variants.length > 0) {
      return 0;
    }

    return product.totalStock !== undefined ? product.totalStock : DEFAULT_STOCK_QUANTITY;
  }, [currentVariant, product.totalStock, product.variants]);

  return {
    uniqueSizes,
    uniqueColors,
    selectedSize,
    selectedColor,
    currentVariant,
    isAvailable,
    stockQuantity,
    selectSize: setSelectedSize,
    selectColor: setSelectedColor,
  };
}
