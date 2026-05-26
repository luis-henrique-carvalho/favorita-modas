"use client";

import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HomeManifesto() {
  return (
    <section className="bg-surface-container-low py-12" id="sobre">
      <div className="container-boutique flex max-w-xl flex-col items-center gap-5 text-center">
        <h2 className="px-4 font-heading text-xl font-medium italic leading-relaxed text-primary md:text-2xl">
          &ldquo;A Favorita Modas nasceu do desejo genuíno de celebrar a feminilidade autêntica com
          exclusividade.&rdquo;
        </h2>

        <div className="flex justify-center gap-0.5 text-primary" aria-label="Avaliação 5 de 5">
          {[...Array(5)].map((_, index) => (
            <Star key={index} className="size-4 fill-primary text-primary" />
          ))}
        </div>

        <div className="flex flex-col items-center gap-2">
          <Badge variant="secondary">+5.000 clientes encantadas</Badge>
          <p className="max-w-sm text-xs font-medium text-on-surface-variant">
            Curadoria cuidadosa com tecidos nobres e acabamentos premium para seu estilo brilhar no
            dia a dia.
          </p>
        </div>
      </div>
    </section>
  );
}
