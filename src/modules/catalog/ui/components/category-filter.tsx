"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { PublicCategory } from "../../types";

interface CategoryFilterProps {
  categories: PublicCategory[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedSize: string;
  onSelectSize: (size: string) => void;
  onlyAvailable: boolean;
  onToggleOnlyAvailable: (value: boolean) => void;
}

const AVAILABLE_SIZES = ["Todos", "P", "M", "G", "GG", "Único"];

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedSize,
  onSelectSize,
  onlyAvailable,
  onToggleOnlyAvailable,
}: CategoryFilterProps) {
  return (
    <div
      className="container-boutique flex flex-col gap-4 py-4 border-b border-surface-container"
      id="filters-container"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Categories Carousel */}
        <nav className="w-full md:w-auto" aria-label="Categorias do catálogo">
          <ScrollArea
            className="w-full whitespace-nowrap scrollbar-none"
            style={{ scrollbarWidth: "none" }}
          >
            <ToggleGroup
              type="single"
              value={selectedCategory}
              onValueChange={(value) => value && onSelectCategory(value)}
              variant="outline"
              size="sm"
              className="w-max pb-1 flex gap-2"
              aria-label="Filtrar produtos por categoria"
            >
              <ToggleGroupItem
                value="Tudo"
                className="rounded-full px-4 text-xs font-semibold data-[state=on]:bg-secondary-container data-[state=on]:text-on-secondary-container transition-all"
              >
                Todos
              </ToggleGroupItem>
              {categories.map((category) => (
                <ToggleGroupItem
                  key={category.id}
                  value={category.name}
                  className="rounded-full px-4 text-xs font-semibold data-[state=on]:bg-secondary-container data-[state=on]:text-on-secondary-container transition-all"
                >
                  {category.name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </nav>

        {/* Filters Group (Size + Availability) */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          {/* Size Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full px-4 h-9 text-xs font-semibold flex items-center gap-1 bg-surface-container border-none text-on-surface-variant hover:bg-surface-container-high transition-colors"
              >
                <span>Tamanho{selectedSize !== "Todos" ? `: ${selectedSize}` : ""}</span>
                <ChevronDown className="h-3 w-3 text-outline" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="rounded-xl border-outline-variant/30 min-w-[120px] bg-background z-50"
            >
              {AVAILABLE_SIZES.map((size) => (
                <DropdownMenuItem
                  key={size}
                  onClick={() => onSelectSize(size)}
                  className="flex items-center justify-between text-xs px-3 py-2 cursor-pointer font-medium"
                >
                  <span>{size === "Todos" ? "Todos os tamanhos" : size}</span>
                  {selectedSize === size && <Check className="h-3.5 w-3.5 text-primary" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Availability Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleOnlyAvailable(!onlyAvailable)}
            className={`rounded-full px-4 h-9 text-xs font-semibold transition-all border-none ${
              onlyAvailable
                ? "bg-secondary-container text-on-secondary-container hover:bg-secondary-container"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            {onlyAvailable ? "Apenas disponíveis" : "Todos os produtos"}
          </Button>
        </div>
      </div>
    </div>
  );
}
