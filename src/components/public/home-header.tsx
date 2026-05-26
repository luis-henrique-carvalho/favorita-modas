"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

interface HomeHeaderProps {
  onOpenMenu: () => void;
  onOpenBag: () => void;
  favoritesCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function HomeHeader({
  onOpenMenu,
  onOpenBag,
  favoritesCount,
  searchQuery,
  onSearchChange,
}: HomeHeaderProps) {
  const [showSearchInput, setShowSearchInput] = React.useState(false);

  return (
    <div className="fixed top-0 z-50 w-full border-b border-outline-variant/30 bg-background/95 backdrop-blur-md">
      <header className="container-boutique flex h-14 items-center justify-between">
        <Button
          onClick={onOpenMenu}
          variant="ghost"
          size="icon-lg"
          className="rounded-full text-primary"
          aria-label="Abrir menu lateral"
        >
          <Menu />
        </Button>

        <Link href="/" className="font-heading text-[22px] font-bold tracking-tight text-primary">
          Favorita Modas
        </Link>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowSearchInput((current) => !current)}
            variant="ghost"
            size="icon"
            className={cn("rounded-full text-primary", showSearchInput && "bg-surface-container")}
            aria-label="Buscar produtos"
            aria-expanded={showSearchInput}
          >
            <Search />
          </Button>

          <Button
            onClick={onOpenBag}
            variant="ghost"
            size="icon"
            className="relative rounded-full text-primary"
            aria-label="Abrir lista de interesse"
          >
            <ShoppingBag />
            {favoritesCount > 0 && (
              <Badge className="absolute -right-1 -top-1 min-w-4 px-1 text-[10px]">
                {favoritesCount}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      {showSearchInput && (
        <div className="container-boutique max-w-md pb-3 animate-in fade-in slide-in-from-top-2">
          <InputGroup className="rounded-full bg-surface-container">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              type="search"
              placeholder="Buscar vestidos, conjuntos..."
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              autoFocus
            />
          </InputGroup>
        </div>
      )}
    </div>
  );
}
