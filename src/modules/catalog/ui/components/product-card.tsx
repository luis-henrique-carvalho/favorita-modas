"use client";

import * as React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { PublicProductImage } from "../../types";

const PRODUCT_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number | string;
  status: "AVAILABLE" | "UNAVAILABLE" | "COMING_SOON" | "PRE_ORDER";
  images?: PublicProductImage[];
  categoryName?: string;
  className?: string;
  isFavorite?: boolean;
  onToggleFavorite?: (event: React.MouseEvent) => void;
  sizes?: string[];
  totalStock?: number;
}

function ProductStatusBadge({
  status,
  totalStock,
  categoryName,
}: {
  status: ProductCardProps["status"];
  totalStock?: number;
  categoryName?: string;
}) {
  // If status is UNAVAILABLE or totalStock is 0, show Esgotado
  if (status === "UNAVAILABLE" || (totalStock !== undefined && totalStock === 0)) {
    return (
      <Badge
        variant="destructive"
        className="absolute left-3 top-3 z-10 font-semibold tracking-wide shadow-sm"
      >
        Esgotado
      </Badge>
    );
  }

  // If COMING_SOON, show Em breve
  if (status === "COMING_SOON") {
    return (
      <Badge
        variant="secondary"
        className="absolute left-3 top-3 z-10 font-semibold tracking-wide shadow-sm"
      >
        Em breve
      </Badge>
    );
  }

  // If PRE_ORDER, show Sob encomenda
  if (status === "PRE_ORDER") {
    return (
      <Badge
        variant="outline"
        className="absolute left-3 top-3 z-10 bg-background/90 text-primary border-outline-variant font-semibold tracking-wide shadow-sm"
      >
        Sob encomenda
      </Badge>
    );
  }

  // If AVAILABLE and totalStock is low (between 1 and 2), show Últimas peças
  if (status === "AVAILABLE" && totalStock !== undefined && totalStock > 0 && totalStock < 3) {
    return (
      <Badge className="absolute left-3 top-3 z-10 bg-error-container text-on-error-container hover:bg-error-container border-none font-semibold tracking-wide shadow-sm">
        Últimas peças
      </Badge>
    );
  }

  // If AVAILABLE and we want to show a "Novo" or "Premium" badge
  if (status === "AVAILABLE") {
    if (
      categoryName?.toLowerCase() === "novidades" ||
      categoryName?.toLowerCase() === "premium" ||
      categoryName?.toLowerCase() === "novo"
    ) {
      return (
        <Badge className="absolute left-3 top-3 z-10 bg-secondary-container text-on-secondary-container hover:bg-secondary-container border-none font-semibold tracking-wide shadow-sm">
          Novo
        </Badge>
      );
    }
  }

  return null;
}

export function ProductCard({
  name,
  slug,
  price,
  status,
  images = [],
  categoryName,
  className,
  isFavorite = false,
  onToggleFavorite,
  sizes = [],
  totalStock,
}: ProductCardProps) {
  const imageUrl = images[0]?.url || PRODUCT_IMAGE_FALLBACK;
  const imageAlt = images[0]?.alt || name;

  return (
    <Card
      size="sm"
      className={cn(
        "h-full gap-0 rounded-2xl border-none shadow-[0px_4px_20px_rgba(127,75,108,0.04)] transition-all duration-500 hover:shadow-[0px_8px_30px_rgba(127,75,108,0.08)] hover:-translate-y-1 bg-surface-container-lowest",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-t-2xl bg-surface-container-low">
        <AspectRatio ratio={3 / 4}>
          <ProductStatusBadge status={status} totalStock={totalStock} categoryName={categoryName} />

          {onToggleFavorite && (
            <Button
              type="button"
              onClick={onToggleFavorite}
              size="icon-sm"
              variant="outline"
              className="absolute right-3 top-3 z-10 rounded-full bg-background/90 shadow-sm backdrop-blur-sm transition-transform active:scale-90 hover:bg-background"
              aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-colors",
                  isFavorite && "fill-primary text-primary",
                )}
              />
            </Button>
          )}

          <Link href={`/produtos/${slug}`} className="block h-full w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={imageAlt}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
              loading="lazy"
              onError={(event) => {
                if (event.currentTarget.src !== PRODUCT_IMAGE_FALLBACK) {
                  event.currentTarget.src = PRODUCT_IMAGE_FALLBACK;
                }
              }}
            />
          </Link>

          {categoryName && (
            <Badge
              variant="secondary"
              className="absolute bottom-3 left-3 z-10 bg-background/95 hover:bg-background/95 backdrop-blur-sm border-none text-xs text-on-surface-variant font-medium rounded-full"
            >
              {categoryName}
            </Badge>
          )}
        </AspectRatio>
      </div>

      <CardContent className="flex flex-1 flex-col gap-2 pt-4 px-4 pb-2">
        <CardTitle>
          <Link href={`/produtos/${slug}`} className="group/title">
            <h3 className="line-clamp-1 font-heading text-lg font-medium tracking-normal text-foreground transition-colors group-hover/title:text-primary">
              {name}
            </h3>
          </Link>
        </CardTitle>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 border-0 bg-transparent pt-0 pb-4 px-4">
        <div className="flex w-full items-center justify-between">
          <span className="font-sans text-base font-semibold text-secondary">
            {formatCurrency(price)}
          </span>
          {sizes.length > 0 ? (
            <span className="text-xs text-outline font-medium tracking-tight bg-surface-container-low/60 px-2 py-0.5 rounded">
              {sizes.join(", ")}
            </span>
          ) : (
            <span className="text-xs text-outline font-medium tracking-tight bg-surface-container-low/60 px-2 py-0.5 rounded">
              Único
            </span>
          )}
        </div>

        <Button asChild variant="link" size="sm" className="h-auto px-0 text-xs font-semibold">
          <Link href={`/produtos/${slug}`}>
            {status === "UNAVAILABLE" || (totalStock !== undefined && totalStock === 0)
              ? "Lista de espera"
              : "Ver detalhes"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
