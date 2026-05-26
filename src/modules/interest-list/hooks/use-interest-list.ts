"use client";

import * as React from "react";
import type { FavoriteProduct, PublicProduct } from "@/modules/catalog/types";

const FAVORITES_STORAGE_KEY = "favorita_favorites";

function readStoredFavorites() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const savedFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    return savedFavorites ? (JSON.parse(savedFavorites) as FavoriteProduct[]) : [];
  } catch {
    return [];
  }
}

export function useInterestList() {
  const [favorites, setFavorites] = React.useState<FavoriteProduct[]>(readStoredFavorites);

  const saveFavorites = React.useCallback((newFavorites: FavoriteProduct[]) => {
    setFavorites(newFavorites);

    try {
      window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
    } catch {
      // The UI still works when storage is blocked or unavailable.
    }
  }, []);

  const removeFavorite = React.useCallback(
    (id: string) => {
      saveFavorites(favorites.filter((favorite) => favorite.id !== id));
    },
    [favorites, saveFavorites],
  );

  const toggleFavorite = React.useCallback(
    (product: PublicProduct) => {
      const isAlreadyFavorite = favorites.some((favorite) => favorite.id === product.id);

      if (isAlreadyFavorite) {
        saveFavorites(favorites.filter((favorite) => favorite.id !== product.id));
        return false;
      }

      saveFavorites([
        ...favorites,
        {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.images?.[0]?.url,
        },
      ]);

      return true;
    },
    [favorites, saveFavorites],
  );

  return {
    favorites,
    removeFavorite,
    toggleFavorite,
  };
}
