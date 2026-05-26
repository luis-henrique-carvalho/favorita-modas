"use client";

import * as React from "react";
import { Bell } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/format";
import { createLeadAction } from "@/server/actions/leads/create-lead";
import type { ProductDetail } from "../../types";

interface ProductLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Pick<ProductDetail, "id" | "name" | "price">;
  selectedSize: string;
  selectedColor: string;
  variantId?: string;
}

export function ProductLeadDialog({
  open,
  onOpenChange,
  product,
  selectedSize,
  selectedColor,
  variantId,
}: ProductLeadDialogProps) {
  const [name, setName] = React.useState("");
  const [whatsapp, setWhatsapp] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Por favor, preencha o seu nome.");
      return;
    }
    if (!whatsapp.trim() || whatsapp.replace(/\D/g, "").length < 10) {
      toast.error("Por favor, preencha um número de WhatsApp válido com DDD.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await createLeadAction({
        productId: product.id,
        productVariantId: variantId,
        name,
        whatsapp,
        selectedSize,
        selectedColor,
        message: `Cliente tem interesse em ${product.name} (Tamanho: ${selectedSize}, Cor: ${selectedColor}) que está indisponível.`,
      });

      if (response.success) {
        toast.success(response.message || "Interesse registrado com sucesso!");
        setName("");
        setWhatsapp("");
        onOpenChange(false);
      } else {
        toast.error(response.error || "Ocorreu um erro ao registrar interesse.");
      }
    } catch {
      toast.error("Falha ao registrar seu interesse. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-surface p-6 rounded-2xl shadow-2xl border border-outline-variant/30 font-sans">
        <DialogHeader className="space-y-2 text-center flex flex-col items-center">
          <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center text-primary mb-1">
            <Bell className="h-6 w-6" />
          </div>
          <DialogTitle className="font-headline text-xl text-primary font-medium">
            Avise-me
          </DialogTitle>
          <DialogDescription className="font-body-md text-xs text-on-surface-variant max-w-sm">
            Prometemos avisar você assim que esta peça exclusiva voltar ao nosso estoque!
          </DialogDescription>
        </DialogHeader>

        <div className="bg-surface-container-low/50 p-4 rounded-xl border border-outline-variant/30 text-xs my-2 space-y-1">
          <span className="font-bold text-on-surface-variant uppercase tracking-wider text-[10px] block">
            Peça Desejada:
          </span>
          <div className="flex justify-between items-center text-on-surface">
            <span className="font-semibold">{product.name}</span>
            <span className="text-primary font-bold">{formatCurrency(product.price)}</span>
          </div>
          <div className="text-on-surface-variant flex gap-4 mt-1 font-medium">
            <span>
              Tamanho: <strong>{selectedSize}</strong>
            </span>
            <span>
              Cor: <strong>{selectedColor}</strong>
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label
              htmlFor="lead-name"
              className="text-xs font-bold uppercase tracking-wide text-on-surface-variant"
            >
              Seu Nome
            </Label>
            <Input
              id="lead-name"
              type="text"
              placeholder="Ex: Amanda Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-12 bg-surface-container-low border-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary/20 text-sm placeholder:opacity-60"
            />
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="lead-tel"
              className="text-xs font-bold uppercase tracking-wide text-on-surface-variant"
            >
              Seu WhatsApp
            </Label>
            <Input
              id="lead-tel"
              type="tel"
              placeholder="Ex: (75) 99999-9999"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
              className="h-12 bg-surface-container-low border-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary/20 text-sm placeholder:opacity-60"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-primary text-on-primary hover:bg-primary/90 rounded-xl font-semibold shadow-md shadow-primary/10 mt-2 transition-all"
          >
            {isSubmitting ? "CADASTRANDO..." : "CADASTRAR MEU INTERESSE"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
