"use client";

import Link from "next/link";
import { Home, Info, ShoppingBag, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BottomInterestNavProps {
  onOpenBag: () => void;
  favoritesCount: number;
}

export function BottomInterestNav({ onOpenBag, favoritesCount }: BottomInterestNavProps) {
  return (
    <nav className="fixed bottom-0 z-50 flex h-16 w-full items-center justify-around border-t border-outline-variant/30 bg-background/90 px-4 backdrop-blur-md md:hidden">
      <Button asChild variant="ghost" className="h-auto flex-col gap-1 rounded-lg text-primary">
        <Link href="/" aria-label="Ir para o início">
          <Home />
          <span className="text-[10px] font-semibold">Início</span>
        </Link>
      </Button>

      <Button asChild variant="ghost" className="h-auto flex-col gap-1 rounded-lg">
        <Link href="#catalogo" aria-label="Ir para o catálogo">
          <Sparkles />
          <span className="text-[10px] font-semibold">Catálogo</span>
        </Link>
      </Button>

      <Button
        type="button"
        onClick={onOpenBag}
        variant="ghost"
        className="relative h-auto flex-col gap-1 rounded-lg"
        aria-label="Abrir lista de interesse"
      >
        <ShoppingBag />
        {favoritesCount > 0 && (
          <Badge className="absolute -right-1 -top-1 min-w-4 px-1 text-[10px]">
            {favoritesCount}
          </Badge>
        )}
        <span className="text-[10px] font-semibold">Interesse</span>
      </Button>

      <Button asChild variant="ghost" className="h-auto flex-col gap-1 rounded-lg">
        <Link href="#sobre" aria-label="Ir para sobre a loja">
          <Info />
          <span className="text-[10px] font-semibold">Sobre</span>
        </Link>
      </Button>
    </nav>
  );
}
