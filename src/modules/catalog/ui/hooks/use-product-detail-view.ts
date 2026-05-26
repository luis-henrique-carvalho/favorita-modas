"use client";

import * as React from "react";
import { formatCurrency } from "@/lib/format";
import type { ProductDetail } from "../../types";
import { useProductDetailInterest } from "./use-product-detail-interest";
import { useProductDetailNavigation } from "./use-product-detail-navigation";
import { useProductOptions } from "./use-product-options";

const PRODUCT_DESCRIPTION_FALLBACK =
  "Uma peça que exala sofisticação. Confeccionada com tecidos nobres e acabamento de alta costura, este modelo possui caimento fluido e elegante, ideal para eventos exclusivos ou looks modernos de editorial.";

const COMPARE_AT_PRICE_MULTIPLIER = 1.25;

export function useProductDetailView(product: ProductDetail) {
  const navigation = useProductDetailNavigation();
  const options = useProductOptions(product);
  const interest = useProductDetailInterest(product, navigation.openBag);

  const productInfo = React.useMemo(
    () => ({
      categoryName: product.categoryName || "Catálogo",
      collectionName: product.categoryName || "Essenciais",
      description: product.description || PRODUCT_DESCRIPTION_FALLBACK,
      formattedPrice: formatCurrency(product.price),
      formattedCompareAtPrice: formatCurrency(Number(product.price) * COMPARE_AT_PRICE_MULTIPLIER),
      leadProduct: {
        id: product.id,
        name: product.name,
        price: product.price,
      },
    }),
    [product.categoryName, product.description, product.id, product.name, product.price],
  );

  return {
    navigation,
    options,
    interest,
    productInfo,
  };
}
