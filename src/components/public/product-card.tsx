"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ProductImage {
  url: string;
  alt?: string | null;
}

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number | string;
  status: "AVAILABLE" | "UNAVAILABLE" | "COMING_SOON" | "PRE_ORDER";
  images?: ProductImage[];
  categoryName?: string;
  className?: string;
}

export function ProductCard({
  name,
  slug,
  price,
  status,
  images = [],
  categoryName,
  className,
}: ProductCardProps) {
  // Use first image URL or a placeholder
  const imageUrl = images?.[0]?.url || "/placeholder-product.jpg";
  const imageAlt = images?.[0]?.alt || name;

  // Format currency
  const formattedPrice = React.useMemo(() => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    if (isNaN(numPrice)) return "R$ 0,00";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numPrice);
  }, [price]);

  // Determine badge styling based on status
  const statusBadge = React.useMemo(() => {
    switch (status) {
      case "UNAVAILABLE":
        return (
          <Badge
            variant="destructive"
            className="absolute top-3 left-3 bg-destructive/90 text-destructive-foreground backdrop-blur-sm"
          >
            Esgotado
          </Badge>
        );
      case "COMING_SOON":
        return (
          <Badge className="absolute top-3 left-3 bg-secondary-container/90 text-on-secondary-container backdrop-blur-sm">
            Em Breve
          </Badge>
        );
      case "PRE_ORDER":
        return (
          <Badge className="absolute top-3 left-3 bg-primary-container/90 text-on-primary-container backdrop-blur-sm">
            Sob Encomenda
          </Badge>
        );
      default:
        return null;
    }
  }, [status]);

  return (
    <div
      className={cn(
        "group/card flex flex-col h-full overflow-hidden rounded-2xl bg-card shadow-card hover:shadow-floating transition-all duration-300 hover-lift select-none border-0",
        className,
      )}
    >
      {/* Product Image Container */}
      <Link
        href={`/produtos/${slug}`}
        className="relative block aspect-[3/4] overflow-hidden w-full bg-surface-container-low"
      >
        {statusBadge}
        {categoryName && (
          <span className="absolute bottom-3 left-3 z-10 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-white/70 backdrop-blur-xs text-on-surface">
            {categoryName}
          </span>
        )}
        <img
          src={imageUrl}
          alt={imageAlt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80"; // Beautiful fallback fashion photo
          }}
        />
      </Link>

      {/* Product Details */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <Link href={`/produtos/${slug}`} className="group/title">
          <h3 className="font-heading text-lg font-medium text-foreground tracking-tight line-clamp-1 group-hover/title:text-primary transition-colors">
            {name}
          </h3>
        </Link>

        <div className="flex items-baseline justify-between mt-auto">
          <span className="font-sans font-semibold text-base text-secondary">{formattedPrice}</span>

          <Link
            href={`/produtos/${slug}`}
            className="text-[12px] font-semibold text-primary/80 hover:text-primary transition-colors flex items-center gap-1 group/link"
          >
            <span>{status === "UNAVAILABLE" ? "Lista de Espera" : "Ver Detalhes"}</span>
            <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-0.5">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
