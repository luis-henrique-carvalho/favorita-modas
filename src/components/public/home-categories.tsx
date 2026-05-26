"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { PublicCategory } from "./home-types";

interface HomeCategoriesProps {
  categories: PublicCategory[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function HomeCategories({
  categories,
  selectedCategory,
  onSelectCategory,
}: HomeCategoriesProps) {
  return (
    <nav className="container-boutique" aria-label="Categorias do catálogo">
      <ScrollArea className="w-full whitespace-nowrap">
        <ToggleGroup
          type="single"
          value={selectedCategory}
          onValueChange={(value) => value && onSelectCategory(value)}
          variant="outline"
          size="sm"
          className="w-max pb-3"
          aria-label="Filtrar produtos por categoria"
        >
          <ToggleGroupItem
            value="Tudo"
            className="rounded-full px-4 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            Tudo
          </ToggleGroupItem>
          {categories.map((category) => (
            <ToggleGroupItem
              key={category.id}
              value={category.name}
              className="rounded-full px-4 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              {category.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </nav>
  );
}
