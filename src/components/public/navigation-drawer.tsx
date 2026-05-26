"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Heart, Info, MessageCircle, Sparkles, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatCurrency } from "@/lib/format";
import { generateFavoritesWhatsAppLink } from "@/lib/whatsapp";
import type { FavoriteProduct } from "./home-types";

interface NavigationDrawerProps {
  isMenuOpen: boolean;
  isBagOpen: boolean;
  onCloseMenu: () => void;
  onCloseBag: () => void;
  favorites: FavoriteProduct[];
  onRemoveFavorite: (id: string) => void;
  whatsappPhone: string;
}

const menuItems = [
  { href: "#catalogo", label: "Nova Coleção", icon: Sparkles, featured: true },
  { href: "#catalogo", label: "Coleções", icon: BookOpen },
  { href: "#sobre", label: "Sobre Nós", icon: Info },
  { href: "#contato", label: "Contato", icon: MessageCircle },
];

export function NavigationDrawer({
  isMenuOpen,
  isBagOpen,
  onCloseMenu,
  onCloseBag,
  favorites,
  onRemoveFavorite,
  whatsappPhone,
}: NavigationDrawerProps) {
  const whatsappLink = React.useMemo(
    () => generateFavoritesWhatsAppLink({ phone: whatsappPhone, items: favorites }),
    [favorites, whatsappPhone],
  );

  return (
    <>
      <Sheet open={isMenuOpen} onOpenChange={(open) => !open && onCloseMenu()}>
        <SheetContent side="left" className="w-80 max-w-[90vw] p-6" showCloseButton>
          <SheetHeader className="p-0">
            <SheetTitle className="font-heading text-2xl font-bold tracking-tight text-primary">
              Favorita Modas
            </SheetTitle>
            <SheetDescription>
              Boutique premium com atendimento direto no WhatsApp.
            </SheetDescription>
          </SheetHeader>

          <Separator />

          <ItemGroup className="gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <Item
                  key={`${item.href}-${item.label}`}
                  asChild
                  variant={item.featured ? "muted" : "default"}
                  className="rounded-xl"
                >
                  <Link href={item.href} onClick={onCloseMenu}>
                    <ItemMedia variant="icon">
                      <Icon />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle className={item.featured ? "text-primary" : undefined}>
                        {item.label}
                      </ItemTitle>
                    </ItemContent>
                  </Link>
                </Item>
              );
            })}
          </ItemGroup>

          <SheetFooter className="mt-auto p-0 text-center">
            <Separator />
            <div className="flex flex-col gap-1">
              <p className="text-label-sm font-medium text-on-surface-variant">
                Atendimento personalizado
              </p>
              <p className="text-xs text-outline">© 2026 Favorita Modas</p>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={isBagOpen} onOpenChange={(open) => !open && onCloseBag()}>
        <SheetContent side="right" className="w-96 max-w-[90vw] p-6" showCloseButton>
          <SheetHeader className="p-0">
            <SheetTitle className="flex items-center gap-2 text-left font-heading text-xl font-semibold">
              <Heart className="fill-primary text-primary" />
              <span>Lista de Interesse</span>
              <Badge>{favorites.length}</Badge>
            </SheetTitle>
            <SheetDescription>
              Selecione peças e envie uma mensagem pronta para a loja.
            </SheetDescription>
          </SheetHeader>

          <Separator />

          <ScrollArea className="min-h-0 flex-1">
            {favorites.length === 0 ? (
              <Empty className="min-h-full border border-outline-variant/30 bg-background">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Heart />
                  </EmptyMedia>
                  <EmptyTitle>Sua lista está vazia</EmptyTitle>
                  <EmptyDescription>
                    Explore o catálogo, salve suas peças favoritas e envie tudo pelo WhatsApp.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button onClick={onCloseBag} variant="secondary" size="sm">
                    Explorar catálogo
                  </Button>
                </EmptyContent>
              </Empty>
            ) : (
              <ItemGroup className="pr-3">
                {favorites.map((item) => (
                  <Item key={item.id} variant="outline" className="relative gap-3 rounded-xl">
                    <ItemMedia variant="image" className="h-20 w-16 rounded-lg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image || "/placeholder-product.jpg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </ItemMedia>
                    <ItemContent className="min-w-0 pr-8">
                      <ItemTitle className="truncate">{item.name}</ItemTitle>
                      <p className="text-sm font-semibold text-primary">
                        {formatCurrency(item.price)}
                      </p>
                    </ItemContent>
                    <ItemActions className="absolute right-2 top-2">
                      <Button
                        onClick={() => onRemoveFavorite(item.id)}
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Remover ${item.name}`}
                      >
                        <Trash2 />
                      </Button>
                    </ItemActions>
                  </Item>
                ))}
              </ItemGroup>
            )}
          </ScrollArea>

          {favorites.length > 0 && (
            <SheetFooter className="p-0">
              <Separator />
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-on-surface-variant">Itens selecionados</span>
                <Badge variant="secondary">{favorites.length} peças</Badge>
              </div>

              <Button asChild className="h-11 w-full font-semibold shadow-soft">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle data-icon="inline-start" />
                  <span>Enviar interesse</span>
                  <ArrowRight data-icon="inline-end" />
                </a>
              </Button>

              <p className="text-center text-xs leading-normal text-outline">
                A conversa abrirá com as peças selecionadas já preenchidas.
              </p>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
