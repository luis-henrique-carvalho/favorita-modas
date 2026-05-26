"use client";

import Link from "next/link";
import { Heart, Sparkles } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HomeHeroProps {
  onOpenBag: () => void;
}

export function HomeHero({ onOpenBag }: HomeHeroProps) {
  return (
    <section className="bg-background py-6">
      <div className="container-boutique grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div className="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
          <Badge variant="secondary">
            <Sparkles data-icon="inline-start" />
            Essência e estilo
          </Badge>

          <div className="flex max-w-xl flex-col gap-4">
            <h1 className="font-heading text-[32px] font-bold leading-tight tracking-normal text-on-surface md:text-[44px]">
              A beleza de ser única em cada detalhe.
            </h1>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-on-surface-variant md:mx-0 md:text-base">
              Descubra nossa curadoria de peças exclusivas, feitas para exaltar sua autenticidade
              com sofisticação e conforto impecáveis.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2 md:justify-start">
            <Button asChild className="rounded-full px-6 font-semibold shadow-md hover-lift">
              <Link href="#catalogo">Descobrir coleção</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="rounded-full px-6 font-semibold hover-lift"
            >
              <Link href="#sobre">Saber mais</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <AspectRatio
            ratio={4 / 5}
            className="overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container shadow-card"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Modelo usando peça da curadoria Favorita Modas"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3GHwGg4DGve-z6kGh-BoHT5ksU6sAmBau9tQKV431K1zcRRYVdx1dXWSihOPRKl_MWxIT4QxUL1G0Pczke7HvzQZJw0akcebKEg22KsYO9bxccjOPU0tTgmgNNfWULBwaB8RVnFQxdZd_gE46ukMeTEs_7E1JupJ093UXTZAgRvuN_12qzxChqzvMQzfXAeQeiSs8vIMEV98fMe3s-Qymumt42Km6-Oz_3A5dcmo_Ygw8-4YuVNP3bxThUKCB8Sd4UmpR9-O8EZg"
            />
          </AspectRatio>

          <Button
            type="button"
            onClick={onOpenBag}
            variant="outline"
            className="absolute -bottom-3 -right-2 h-auto rounded-2xl bg-background/90 p-3 shadow-floating backdrop-blur md:bottom-6 md:-right-4"
          >
            <Heart data-icon="inline-start" />
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[10px] font-bold uppercase tracking-normal text-primary">
                Favoritos
              </span>
              <span className="text-xs font-semibold text-on-surface">Lista de interesse</span>
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
