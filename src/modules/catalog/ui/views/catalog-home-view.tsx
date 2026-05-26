"use client";

import * as React from "react";
import { BottomInterestNav } from "@/modules/interest-list/ui/components/bottom-interest-nav";
import { InterestNavigationDrawer } from "@/modules/interest-list/ui/components/interest-navigation-drawer";
import { useInterestList } from "@/modules/interest-list/hooks/use-interest-list";
import { StorefrontFooter } from "@/modules/storefront/ui/components/storefront-footer";
import { StorefrontHeader } from "@/modules/storefront/ui/components/storefront-header";
import { StorefrontHero } from "@/modules/storefront/ui/components/storefront-hero";
import { StorefrontManifesto } from "@/modules/storefront/ui/components/storefront-manifesto";
import { WhatsAppButton } from "@/modules/whatsapp/ui/components/whatsapp-button";
import { CategoryFilter } from "../components/category-filter";
import { HomeNewArrivals } from "../components/new-arrivals";
import { ProductGrid } from "../components/product-grid";
import type { PublicCategory, PublicProduct } from "../../types";

interface CatalogHomeViewProps {
  initialCategories: PublicCategory[];
  initialProducts: PublicProduct[];
  whatsappPhone: string;
}

export function CatalogHomeView({
  initialCategories,
  initialProducts,
  whatsappPhone,
}: CatalogHomeViewProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isBagOpen, setIsBagOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState("Tudo");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedSize, setSelectedSize] = React.useState("Todos");
  const [onlyAvailable, setOnlyAvailable] = React.useState(false);
  const { favorites, removeFavorite, toggleFavorite } = useInterestList();

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
    setSelectedSize("Todos");
    setOnlyAvailable(false);
  }, []);

  const filteredProducts = React.useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return initialProducts.filter((product) => {
      // 1. Category Filter
      const matchesCategory =
        selectedCategory === "Tudo" ||
        product.categoryName?.toLowerCase() === selectedCategory.toLowerCase();

      // 2. Search Filter
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        (product.description?.toLowerCase().includes(normalizedSearch) ?? false);

      // 3. Size Filter
      const matchesSize =
        selectedSize === "Todos" ||
        (product.sizes !== undefined &&
          product.sizes.some((size) => size.toLowerCase() === selectedSize.toLowerCase()));

      // 4. Availability Filter
      const matchesAvailability =
        !onlyAvailable ||
        (product.status !== "UNAVAILABLE" &&
          (product.totalStock === undefined || product.totalStock > 0));

      return matchesCategory && matchesSearch && matchesSize && matchesAvailability;
    });
  }, [initialProducts, selectedCategory, searchQuery, selectedSize, onlyAvailable]);

  const novidadesProducts = React.useMemo(() => initialProducts.slice(0, 3), [initialProducts]);

  return (
    <div className="relative min-h-screen bg-background pb-16 font-sans text-on-background md:pb-0">
      <InterestNavigationDrawer
        isMenuOpen={isMenuOpen}
        isBagOpen={isBagOpen}
        onCloseMenu={() => setIsMenuOpen(false)}
        onCloseBag={() => setIsBagOpen(false)}
        favorites={favorites}
        onRemoveFavorite={removeFavorite}
        whatsappPhone={whatsappPhone}
      />

      <StorefrontHeader
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenBag={() => setIsBagOpen(true)}
        favoritesCount={favorites.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="pb-20 pt-20 md:pb-12">
        <StorefrontHero onOpenBag={() => setIsBagOpen(true)} />

        <div className="mt-4">
          <CategoryFilter
            categories={initialCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
            onlyAvailable={onlyAvailable}
            onToggleOnlyAvailable={setOnlyAvailable}
          />
        </div>

        <HomeNewArrivals
          products={novidadesProducts}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        <ProductGrid
          products={filteredProducts}
          favorites={favorites}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedSize={selectedSize}
          onlyAvailable={onlyAvailable}
          onClearFilters={clearFilters}
          onToggleFavorite={handleToggleFavorite}
        />

        <StorefrontManifesto />
      </main>

      <StorefrontFooter whatsappPhone={whatsappPhone} />

      <BottomInterestNav onOpenBag={() => setIsBagOpen(true)} favoritesCount={favorites.length} />

      <WhatsAppButton
        variant="floating"
        phone={whatsappPhone}
        message="Olá! Gostaria de conhecer mais sobre os vestidos e lançamentos da Favorita Modas."
      />
    </div>
  );
}
