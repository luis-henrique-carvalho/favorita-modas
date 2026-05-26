"use client";

import * as React from "react";
import { Search, SearchX, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ProductCard } from "./product-card";
import type { FavoriteProduct, PublicProduct } from "../../types";

interface ProductGridProps {
  products: PublicProduct[];
  favorites: FavoriteProduct[];
  selectedCategory: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedSize: string;
  onlyAvailable: boolean;
  onClearFilters: () => void;
  onToggleFavorite: (product: PublicProduct) => void;
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-surface-container-lowest p-3 shadow-[0px_4px_20px_rgba(127,75,108,0.02)] border border-surface-container/20">
      <div className="relative overflow-hidden rounded-xl bg-surface-container-low">
        <AspectRatio ratio={3 / 4}>
          <Skeleton className="h-full w-full bg-surface-container-high/60 rounded-xl" />
        </AspectRatio>
      </div>
      <div className="flex flex-col gap-2 pt-2 px-1">
        <Skeleton className="h-4 w-3/4 bg-surface-container-high/60" />
        <div className="flex items-center justify-between gap-4 mt-2">
          <Skeleton className="h-5 w-1/3 bg-surface-container-high/60" />
          <Skeleton className="h-4 w-1/4 bg-surface-container-high/60" />
        </div>
        <Skeleton className="h-3 w-1/4 bg-surface-container-high/60 mt-3" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-10 lg:grid-cols-4 lg:gap-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function ProductGrid({
  products,
  favorites,
  selectedCategory,
  searchQuery,
  onSearchChange,
  selectedSize,
  onlyAvailable,
  onClearFilters,
  onToggleFavorite,
}: ProductGridProps) {
  const [prevProductsLength, setPrevProductsLength] = React.useState(products.length);
  const [visibleCount, setVisibleCount] = React.useState(6);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const observerRef = React.useRef<HTMLDivElement>(null);

  // Sync state if products length changes (standard React state sync during rendering)
  if (products.length !== prevProductsLength) {
    setPrevProductsLength(products.length);
    setVisibleCount(6);
  }

  // Set up intersection observer for infinite scroll
  React.useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < products.length && !isLoadingMore) {
          setIsLoadingMore(true);
          // Organic brief loading delay for premium feeling
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 6, products.length));
            setIsLoadingMore(false);
          }, 600);
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    const currentElement = observerRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [visibleCount, products.length, isLoadingMore, observerRef]);

  const visibleProducts = React.useMemo(() => {
    return products.slice(0, visibleCount);
  }, [products, visibleCount]);

  return (
    <section
      className="border-y border-outline-variant/20 bg-surface-container-lowest/40 py-8 scroll-mt-20"
      id="catalogo"
    >
      <div className="container-boutique flex flex-col gap-6">
        {/* Header Grid Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-surface-container pb-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-on-surface">
                Destaques da Curadoria
              </h2>
              <Badge
                variant="outline"
                className="text-xs bg-surface-container-low border-none text-on-surface-variant font-medium"
              >
                {products.length} {products.length === 1 ? "peça" : "peças"}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-1">
              <Badge
                variant="secondary"
                className="bg-secondary-container text-on-secondary-container border-none text-[10px] rounded-full"
              >
                Categoria: {selectedCategory}
              </Badge>
              {selectedSize !== "Todos" && (
                <Badge
                  variant="secondary"
                  className="bg-secondary-container text-on-secondary-container border-none text-[10px] rounded-full"
                >
                  Tamanho: {selectedSize}
                </Badge>
              )}
              {onlyAvailable && (
                <Badge
                  variant="secondary"
                  className="bg-secondary-container text-on-secondary-container border-none text-[10px] rounded-full"
                >
                  Apenas disponíveis
                </Badge>
              )}
              {searchQuery && (
                <Badge
                  variant="outline"
                  className="border-outline-variant/30 text-[10px] rounded-full"
                >
                  Busca: {searchQuery}
                </Badge>
              )}
            </div>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full max-w-sm self-start md:self-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline" />
            <Input
              type="search"
              placeholder="Buscar no catálogo..."
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              className="w-full pl-9 rounded-full bg-surface-container-low border-none focus-visible:ring-1 focus-visible:ring-primary text-xs h-9 text-on-background placeholder:text-outline"
            />
          </div>
        </div>

        {/* Product Cards Container */}
        {products.length === 0 ? (
          <Empty className="min-h-72 border border-outline-variant/30 bg-background rounded-2xl p-8">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SearchX className="h-10 w-10 text-outline" />
              </EmptyMedia>
              <EmptyTitle className="font-heading text-lg font-medium text-on-surface">
                Nenhum produto encontrado
              </EmptyTitle>
              <EmptyDescription className="text-sm text-outline">
                Tente selecionar outra categoria ou limpar a busca atual.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                onClick={onClearFilters}
                variant="secondary"
                size="sm"
                className="rounded-full px-5"
              >
                Limpar filtros
              </Button>
            </EmptyContent>
          </Empty>
        ) : (
          <div className="flex flex-col gap-10">
            {/* The actual product grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-10 lg:grid-cols-4 lg:gap-8">
              {visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className="animate-in fade-in slide-in-from-bottom-3 duration-500"
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    slug={product.slug}
                    price={product.price}
                    status={product.status}
                    images={product.images}
                    categoryName={product.categoryName}
                    sizes={product.sizes}
                    totalStock={product.totalStock}
                    isFavorite={favorites.some((favorite) => favorite.id === product.id)}
                    onToggleFavorite={(event) => {
                      event.stopPropagation();
                      onToggleFavorite(product);
                    }}
                  />
                </div>
              ))}

              {/* Skeletons rendering during dynamic lazy loading batches */}
              {isLoadingMore &&
                Array.from({ length: 2 }).map((_, index) => (
                  <ProductCardSkeleton key={`skeleton-${index}`} />
                ))}
            </div>

            {/* Bottom Infinite Scroll Target Sensor or Signature */}
            {visibleCount < products.length ? (
              <div ref={observerRef} className="h-16 flex items-center justify-center">
                {!isLoadingMore ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full text-xs text-outline font-medium hover:text-primary transition-colors"
                    onClick={() => setVisibleCount((prev) => Math.min(prev + 6, products.length))}
                  >
                    Carregar mais produtos
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-outline text-xs animate-pulse">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 opacity-70 border-t border-surface-container/50 mt-4">
                <Sparkles className="h-5 w-5 text-primary mb-2 animate-pulse" />
                <p className="font-label-md text-label-md text-on-surface font-medium text-center">
                  Você chegou ao fim das novidades de hoje.
                </p>
                <p className="text-[10px] text-outline mt-1 text-center">
                  Novos vestidos e conjuntos exclusivos toda semana!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
