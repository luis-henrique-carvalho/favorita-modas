"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getColorHex } from "../../constants";

interface ProductSelectorsProps {
  uniqueSizes: string[];
  uniqueColors: string[];
  selectedSize: string;
  selectedColor: string;
  onSelectSize: (size: string) => void;
  onSelectColor: (color: string) => void;
}

export function ProductSelectors({
  uniqueSizes,
  uniqueColors,
  selectedSize,
  selectedColor,
  onSelectSize,
  onSelectColor,
}: ProductSelectorsProps) {
  return (
    <div className="space-y-6 bg-surface-container-low/40 p-4 rounded-2xl border border-surface-container-high">
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-xs text-on-surface uppercase tracking-wider">
            Tamanho
          </span>
          <span className="text-xs text-on-surface-variant font-medium">
            Selecionado: {selectedSize}
          </span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {uniqueSizes.map((size) => {
            const isSelected = size.toLowerCase() === selectedSize.toLowerCase();
            return (
              <button
                key={size}
                onClick={() => onSelectSize(size)}
                className={cn(
                  "min-w-12 h-12 px-3 flex items-center justify-center rounded-xl border font-bold text-sm transition-all",
                  isSelected
                    ? "border-2 border-primary bg-primary-fixed text-on-primary-fixed shadow-sm"
                    : "border-outline-variant bg-background text-on-surface-variant hover:border-primary hover:text-primary",
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-xs text-on-surface uppercase tracking-wider">
            Cor
          </span>
          <span className="text-xs text-on-surface-variant font-medium">{selectedColor}</span>
        </div>
        <div className="flex gap-3 items-center">
          {uniqueColors.map((color) => {
            const isSelected = color.toLowerCase() === selectedColor.toLowerCase();
            return (
              <button
                key={color}
                onClick={() => onSelectColor(color)}
                className={cn(
                  "w-9 h-9 rounded-full transition-all relative border border-outline-variant",
                  isSelected ? "ring-2 ring-offset-2 ring-primary scale-110" : "hover:scale-105",
                )}
                style={{ backgroundColor: getColorHex(color) }}
                title={color}
              >
                {isSelected && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Check
                      className={cn(
                        "h-4 w-4",
                        color.toLowerCase() === "branco" ? "text-primary" : "text-white",
                      )}
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
