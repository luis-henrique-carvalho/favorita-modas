"use client";

import * as React from "react";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PublicProductImage, PublicProduct } from "../../types";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80";

interface ProductGalleryProps {
  images: PublicProductImage[];
  productName: string;
  status: PublicProduct["status"];
  isAvailable: boolean;
  stockQuantity: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

function ProductStatusBadge({
  status,
  isAvailable,
  stockQuantity,
}: {
  status: PublicProduct["status"];
  isAvailable: boolean;
  stockQuantity: number;
}) {
  const cls = "absolute left-4 top-4 z-10 font-semibold tracking-wide shadow-md text-xs py-1 px-3";
  if (!isAvailable)
    return (
      <Badge variant="destructive" className={cls}>
        Esgotado
      </Badge>
    );
  if (status === "COMING_SOON")
    return (
      <Badge variant="secondary" className={cls}>
        Em breve
      </Badge>
    );
  if (status === "PRE_ORDER")
    return (
      <Badge
        variant="outline"
        className={cn(cls, "bg-background/90 text-primary border-outline-variant")}
      >
        Sob encomenda
      </Badge>
    );
  if (stockQuantity > 0 && stockQuantity < 3) {
    return (
      <Badge
        className={cn(
          cls,
          "bg-error-container text-on-error-container hover:bg-error-container border-none animate-pulse",
        )}
      >
        Últimas peças
      </Badge>
    );
  }
  return (
    <Badge
      className={cn(
        cls,
        "bg-secondary-container text-on-secondary-container hover:bg-secondary-container border-none",
      )}
    >
      Exclusivo
    </Badge>
  );
}

export function ProductGallery({
  images,
  productName,
  status,
  isAvailable,
  stockQuantity,
  isFavorite,
  onToggleFavorite,
}: ProductGalleryProps) {
  const productImages = images.length > 0 ? images : [{ url: FALLBACK_IMAGE, alt: productName }];
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const handleImageChange = (index: number) => {
    if (index === activeIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <section className="space-y-4">
      <div className="aspect-3/4 rounded-2xl overflow-hidden shadow-soft relative group bg-surface-container-low">
        <ProductStatusBadge
          status={status}
          isAvailable={isAvailable}
          stockQuantity={stockQuantity}
        />

        <Button
          type="button"
          onClick={onToggleFavorite}
          size="icon-sm"
          variant="outline"
          className="absolute right-4 top-4 z-10 rounded-full bg-background/90 shadow-md backdrop-blur-sm transition-transform active:scale-95 hover:bg-background"
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart
            className={cn("h-5 w-5 transition-colors", isFavorite && "fill-primary text-primary")}
          />
        </Button>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={productImages[activeIndex]?.url}
          alt={productImages[activeIndex]?.alt || productName}
          className={cn(
            "w-full h-full object-cover transition-all duration-300 ease-in-out hover:scale-105",
            isTransitioning ? "opacity-20 scale-95" : "opacity-100",
          )}
        />

        {productImages.length > 1 && (
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            {productImages.map((_, index) => (
              <button
                key={index}
                onClick={() => handleImageChange(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === activeIndex ? "bg-primary scale-125 w-4" : "w-2 bg-primary/30",
                )}
                aria-label={`Visualizar imagem ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {productImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto hide-scrollbar py-1">
          {productImages.map((img, index) => (
            <button
              key={index}
              onClick={() => handleImageChange(index)}
              className={cn(
                "w-20 aspect-3/4 rounded-lg overflow-hidden cursor-pointer border-2 transition-all shrink-0 bg-surface-container-low hover:opacity-90 shadow-sm",
                index === activeIndex
                  ? "border-primary scale-[0.98] shadow-md"
                  : "border-transparent",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.alt || `${productName} miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
