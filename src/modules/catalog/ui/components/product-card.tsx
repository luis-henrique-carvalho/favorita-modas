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
}

function ProductStatusBadge({ status }: { status: ProductCardProps["status"] }) {
  switch (status) {
    case "UNAVAILABLE":
      return (
        <Badge variant="destructive" className="absolute left-3 top-3 z-10 backdrop-blur-sm">
          Esgotado
        </Badge>
      );
    case "COMING_SOON":
      return (
        <Badge variant="secondary" className="absolute left-3 top-3 z-10 backdrop-blur-sm">
          Em breve
        </Badge>
      );
    case "PRE_ORDER":
      return (
        <Badge variant="outline" className="absolute left-3 top-3 z-10 bg-background/80">
          Sob encomenda
        </Badge>
      );
    default:
      return null;
  }
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
}: ProductCardProps) {
  const imageUrl = images[0]?.url || PRODUCT_IMAGE_FALLBACK;
  const imageAlt = images[0]?.alt || name;

  return (
    <Card
      size="sm"
      className={cn(
        "h-full gap-0 rounded-2xl shadow-card transition-all duration-300 hover-lift",
        className,
      )}
    >
      <div className="relative overflow-hidden bg-surface-container-low">
        <AspectRatio ratio={3 / 4}>
          <ProductStatusBadge status={status} />

          {onToggleFavorite && (
            <Button
              type="button"
              onClick={onToggleFavorite}
              size="icon-sm"
              variant="outline"
              className="absolute right-3 top-3 z-10 rounded-full bg-background/90 shadow-sm backdrop-blur-sm"
              aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              <Heart className={cn(isFavorite && "fill-primary text-primary")} />
            </Button>
          )}

          <Link href={`/produtos/${slug}`} className="block h-full w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={imageAlt}
              className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
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
              className="absolute bottom-3 left-3 z-10 bg-background/80 backdrop-blur-sm"
            >
              {categoryName}
            </Badge>
          )}
        </AspectRatio>
      </div>

      <CardContent className="flex flex-1 flex-col gap-2 pt-4">
        <CardTitle>
          <Link href={`/produtos/${slug}`} className="group/title">
            <h3 className="line-clamp-1 font-heading text-lg font-medium tracking-normal text-foreground transition-colors group-hover/title:text-primary">
              {name}
            </h3>
          </Link>
        </CardTitle>
      </CardContent>

      <CardFooter className="justify-between gap-2 border-0 bg-transparent pt-0">
        <span className="font-sans text-base font-semibold text-secondary">
          {formatCurrency(price)}
        </span>

        <Button asChild variant="link" size="sm" className="h-auto px-0 text-xs font-semibold">
          <Link href={`/produtos/${slug}`}>
            {status === "UNAVAILABLE" ? "Lista de espera" : "Ver detalhes"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
