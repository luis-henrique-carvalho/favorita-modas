"use client";

import Link from "next/link";
import { ChevronRight, ArrowLeft, Sparkles, Check, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";

import { BottomInterestNav } from "@/modules/interest-list/ui/components/bottom-interest-nav";
import { InterestNavigationDrawer } from "@/modules/interest-list/ui/components/interest-navigation-drawer";
import { StorefrontHeader } from "@/modules/storefront/ui/components/storefront-header";
import { StorefrontFooter } from "@/modules/storefront/ui/components/storefront-footer";

import { ProductGallery } from "../components/product-gallery";
import { ProductSelectors } from "../components/product-selectors";
import { ProductActions } from "../components/product-actions";
import { ProductLeadDialog } from "../components/product-lead-dialog";
import { ProductRelated } from "../components/product-related";
import { useProductDetailView } from "../hooks/use-product-detail-view";
import type { ProductDetail } from "../../types";

interface ProductDetailViewProps {
  product: ProductDetail;
  whatsappPhone: string;
}

export function ProductDetailView({ product, whatsappPhone }: ProductDetailViewProps) {
  const { navigation, options, interest, productInfo } = useProductDetailView(product);

  return (
    <div className="relative min-h-screen bg-background pb-16 font-sans text-on-background md:pb-0">
      <InterestNavigationDrawer
        isMenuOpen={navigation.isMenuOpen}
        isBagOpen={navigation.isBagOpen}
        onCloseMenu={navigation.closeMenu}
        onCloseBag={navigation.closeBag}
        favorites={interest.favorites}
        onRemoveFavorite={interest.removeFavorite}
        whatsappPhone={whatsappPhone}
      />

      <StorefrontHeader
        onOpenMenu={navigation.openMenu}
        onOpenBag={navigation.openBag}
        favoritesCount={interest.favoritesCount}
        searchQuery={navigation.searchQuery}
        onSearchChange={navigation.setSearchQuery}
      />

      <main className="max-w-container-max mx-auto px-margin-mobile pt-24 pb-20 md:pb-12">
        <div className="flex justify-between items-center py-2 mb-4">
          <nav className="flex items-center gap-2 text-on-surface-variant font-label-sm text-xs">
            <Link href="/" className="hover:text-primary transition-colors">
              Início
            </Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            <Link href="/" className="hover:text-primary transition-colors">
              {productInfo.categoryName}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            <span className="text-primary font-bold line-clamp-1">{product.name}</span>
          </nav>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-xs text-on-surface-variant gap-1.5 hover:text-primary px-2"
          >
            <Link href="/">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Voltar</span>
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-start">
          <ProductGallery
            images={product.images || []}
            productName={product.name}
            status={product.status}
            isAvailable={options.isAvailable}
            stockQuantity={options.stockQuantity}
            isFavorite={interest.isFavorite}
            onToggleFavorite={interest.handleToggleFavorite}
          />

          <section className="flex flex-col gap-6">
            <div className="space-y-1">
              <span className="text-secondary font-label-md text-xs uppercase tracking-widest block font-semibold">
                Coleção {productInfo.collectionName}
              </span>
              <h1 className="font-headline text-3xl font-medium tracking-normal text-on-surface">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 py-2">
                <span className="font-headline text-2xl font-bold text-primary">
                  {productInfo.formattedPrice}
                </span>
                <span className="text-on-surface-variant font-body-md text-sm line-through opacity-60">
                  {productInfo.formattedCompareAtPrice}
                </span>
              </div>
            </div>

            <div className="h-px bg-outline-variant/30 w-full" />

            <div className="space-y-2">
              <span className="font-semibold text-sm text-on-surface uppercase tracking-wider block">
                Descrição
              </span>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                {productInfo.description}
              </p>
            </div>

            <ProductSelectors
              uniqueSizes={options.uniqueSizes}
              uniqueColors={options.uniqueColors}
              selectedSize={options.selectedSize}
              selectedColor={options.selectedColor}
              onSelectSize={options.selectSize}
              onSelectColor={options.selectColor}
            />

            <ProductActions
              isAvailable={options.isAvailable}
              productName={product.name}
              selectedSize={options.selectedSize}
              selectedColor={options.selectedColor}
              whatsappPhone={whatsappPhone}
              onOpenNotify={navigation.openNotify}
            />

            <div className="flex items-center gap-6 py-2 border-t border-outline-variant/20 mt-2">
              <div className="flex items-center gap-2 text-on-surface-variant">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold">Curadoria Exclusiva</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold">Troca Fácil</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <ShoppingBag className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold">WhatsApp Oficial</span>
              </div>
            </div>
          </section>
        </div>

        <ProductRelated />
      </main>

      <StorefrontFooter whatsappPhone={whatsappPhone} />
      <BottomInterestNav onOpenBag={navigation.openBag} favoritesCount={interest.favoritesCount} />

      <ProductLeadDialog
        open={navigation.isNotifyOpen}
        onOpenChange={navigation.setIsNotifyOpen}
        product={productInfo.leadProduct}
        selectedSize={options.selectedSize}
        selectedColor={options.selectedColor}
        variantId={options.currentVariant?.id}
      />
    </div>
  );
}
