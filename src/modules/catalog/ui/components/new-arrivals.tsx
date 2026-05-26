"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ProductCard } from "./product-card";
import type { FavoriteProduct, PublicProduct } from "../../types";

interface HomeNewArrivalsProps {
  products: PublicProduct[];
  favorites: FavoriteProduct[];
  onToggleFavorite: (product: PublicProduct) => void;
}

export function HomeNewArrivals({ products, favorites, onToggleFavorite }: HomeNewArrivalsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-8" id="novidades">
      <div className="container-boutique mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="h-6 w-1.5 rounded-full bg-primary" aria-hidden="true" />
          <h2 className="font-heading text-xl font-semibold text-on-surface">
            Novidades da Semana
          </h2>
        </div>

        <Button asChild variant="link" size="sm" className="px-0 font-bold">
          <Link href="#catalogo">
            <span>Ver tudo</span>
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      </div>

      <ScrollArea className="container-boutique whitespace-nowrap">
        <div className="flex w-max gap-4 pb-4">
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
              className="w-[190px]"
              isFavorite={favorites.some((favorite) => favorite.id === product.id)}
              onToggleFavorite={(event) => {
                event.stopPropagation();
                onToggleFavorite(product);
              }}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
