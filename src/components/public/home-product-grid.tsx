"use client";

import { SearchX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ProductCard } from "./product-card";
import type { FavoriteProduct, PublicProduct } from "./home-types";

interface HomeProductGridProps {
  products: PublicProduct[];
  favorites: FavoriteProduct[];
  selectedCategory: string;
  searchQuery: string;
  onClearFilters: () => void;
  onToggleFavorite: (product: PublicProduct) => void;
}

export function HomeProductGrid({
  products,
  favorites,
  selectedCategory,
  searchQuery,
  onClearFilters,
  onToggleFavorite,
}: HomeProductGridProps) {
  return (
    <section
      className="border-y border-outline-variant/20 bg-surface-container-lowest/40 py-8"
      id="catalogo"
    >
      <div className="container-boutique flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-on-surface">
              Destaques da Curadoria
            </h2>
            <Badge variant="outline">{products.length} peças</Badge>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Categoria: {selectedCategory}</Badge>
            {searchQuery && <Badge variant="outline">Busca: {searchQuery}</Badge>}
          </div>
        </div>

        {products.length === 0 ? (
          <Empty className="min-h-72 border border-outline-variant/30 bg-background">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SearchX />
              </EmptyMedia>
              <EmptyTitle>Nenhum produto encontrado</EmptyTitle>
              <EmptyDescription>
                Tente selecionar outra categoria ou limpar a busca atual.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button onClick={onClearFilters} variant="secondary" size="sm">
                Limpar filtros
              </Button>
            </EmptyContent>
          </Empty>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                slug={product.slug}
                price={product.price}
                status={product.status}
                images={product.images}
                categoryName={product.categoryName}
                isFavorite={favorites.some((favorite) => favorite.id === product.id)}
                onToggleFavorite={(event) => {
                  event.stopPropagation();
                  onToggleFavorite(product);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
