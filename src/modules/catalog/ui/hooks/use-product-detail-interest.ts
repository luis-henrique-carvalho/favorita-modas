"use client";

import * as React from "react";
import { toast } from "sonner";
import { useInterestList } from "@/modules/interest-list/hooks/use-interest-list";
import type { ProductDetail } from "../../types";

export function useProductDetailInterest(product: ProductDetail, openBag: () => void) {
  const { favorites, removeFavorite, toggleFavorite } = useInterestList();

  const isFavorite = React.useMemo(
    () => favorites.some((favorite) => favorite.id === product.id),
    [favorites, product.id],
  );

  const handleToggleFavorite = React.useCallback(() => {
    const added = toggleFavorite({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      images: product.images,
      status: product.status,
    });

    if (added) {
      toast.success("Adicionado à sacola de interesses!", {
        action: { label: "Ver Sacola", onClick: openBag },
      });
      return;
    }

    toast.info("Removido dos favoritos.");
  }, [
    openBag,
    product.id,
    product.images,
    product.name,
    product.price,
    product.slug,
    product.status,
    toggleFavorite,
  ]);

  return {
    favorites,
    favoritesCount: favorites.length,
    isFavorite,
    removeFavorite,
    handleToggleFavorite,
  };
}
