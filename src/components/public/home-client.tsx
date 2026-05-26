"use client";

import * as React from "react";
import { NavigationDrawer } from "./navigation-drawer";
import { HomeHeader } from "./home-header";
import { HomeHero } from "./home-hero";
import { HomeCategories } from "./home-categories";
import { HomeNewArrivals } from "./home-new-arrivals";
import { HomeManifesto } from "./home-manifesto";
import { HomeFooter } from "./home-footer";
import { HomeBottomNav } from "./home-bottom-nav";
import { HomeProductGrid } from "./home-product-grid";
import { WhatsAppButton } from "./whatsapp-button";
import { useFavorites } from "./use-favorites";
import type { PublicCategory, PublicProduct } from "./home-types";

interface HomeClientProps {
  initialCategories: PublicCategory[];
  initialProducts: PublicProduct[];
  whatsappPhone: string;
}

export function HomeClient({ initialCategories, initialProducts, whatsappPhone }: HomeClientProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isBagOpen, setIsBagOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState("Tudo");
  const [searchQuery, setSearchQuery] = React.useState("");
  const { favorites, removeFavorite, toggleFavorite } = useFavorites();

  const handleToggleFavorite = React.useCallback(
    (product: PublicProduct) => {
      const addedToFavorites = toggleFavorite(product);

      if (addedToFavorites) {
        setIsBagOpen(true);
      }
    },
    [toggleFavorite],
  );

  const clearFilters = React.useCallback(() => {
    setSelectedCategory("Tudo");
    setSearchQuery("");
  }, []);

  const filteredProducts = React.useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return initialProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "Tudo" ||
        product.categoryName?.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        (product.description?.toLowerCase().includes(normalizedSearch) ?? false);

      return matchesCategory && matchesSearch;
    });
  }, [initialProducts, selectedCategory, searchQuery]);

  const novidadesProducts = React.useMemo(() => initialProducts.slice(0, 3), [initialProducts]);

  return (
    <div className="relative min-h-screen bg-background pb-16 font-sans text-on-background md:pb-0">
      <NavigationDrawer
        isMenuOpen={isMenuOpen}
        isBagOpen={isBagOpen}
        onCloseMenu={() => setIsMenuOpen(false)}
        onCloseBag={() => setIsBagOpen(false)}
        favorites={favorites}
        onRemoveFavorite={removeFavorite}
        whatsappPhone={whatsappPhone}
      />

      <HomeHeader
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenBag={() => setIsBagOpen(true)}
        favoritesCount={favorites.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="pb-20 pt-20 md:pb-12">
        <HomeHero onOpenBag={() => setIsBagOpen(true)} />

        <div className="mt-4">
          <HomeCategories
            categories={initialCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <HomeNewArrivals
          products={novidadesProducts}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        <HomeProductGrid
          products={filteredProducts}
          favorites={favorites}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          onClearFilters={clearFilters}
          onToggleFavorite={handleToggleFavorite}
        />

        <HomeManifesto />
      </main>

      <HomeFooter whatsappPhone={whatsappPhone} />

      <HomeBottomNav onOpenBag={() => setIsBagOpen(true)} favoritesCount={favorites.length} />

      <WhatsAppButton
        variant="floating"
        phone={whatsappPhone}
        message="Olá! Gostaria de conhecer mais sobre os vestidos e lançamentos da Favorita Modas."
      />
    </div>
  );
}
