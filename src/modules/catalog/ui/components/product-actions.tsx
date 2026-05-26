import { AlertCircle, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/modules/whatsapp/ui/components/whatsapp-button";

interface ProductActionsProps {
  isAvailable: boolean;
  productName: string;
  selectedSize: string;
  selectedColor: string;
  whatsappPhone: string;
  onOpenNotify: () => void;
}

export function ProductActions({
  isAvailable,
  productName,
  selectedSize,
  selectedColor,
  whatsappPhone,
  onOpenNotify,
}: ProductActionsProps) {
  if (isAvailable) {
    return (
      <div className="space-y-4 pt-2">
        <WhatsAppButton
          variant="inline"
          phone={whatsappPhone}
          productName={productName}
          size={selectedSize}
          color={selectedColor}
          label="COMPRAR PELO WHATSAPP"
          className="h-14 font-bold text-sm tracking-widest shadow-lg shadow-primary/10 rounded-xl"
        />
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="bg-surface-container-low p-4 rounded-xl border border-dashed border-outline-variant">
            <span className="font-label-sm text-xs text-on-surface-variant block mb-2 font-semibold">
              Mensagem que será enviada:
            </span>
            <div className="bg-white p-3 rounded-lg text-on-surface-variant font-sans text-xs italic shadow-inner">
              &quot;Olá! Gostaria de encomendar o <strong>{productName}</strong> no tamanho{" "}
              <strong>{selectedSize}</strong> e cor <strong>{selectedColor}</strong>. Vi no site e
              amei!&quot;
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300 space-y-4 pt-2">
      <div className="bg-error-container/40 p-4 rounded-xl border border-error/20 flex gap-3 items-start">
        <AlertCircle className="h-5 w-5 text-error shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-xs text-on-error-container block">Produto Esgotado</span>
          <span className="text-xs text-on-error-container leading-relaxed block">
            O tamanho <strong>{selectedSize}</strong> na cor <strong>{selectedColor}</strong> está
            indisponível para entrega imediata.
          </span>
        </div>
      </div>
      <Button
        type="button"
        onClick={onOpenNotify}
        variant="outline"
        className="w-full h-14 border-primary text-primary rounded-xl font-semibold hover:bg-primary-fixed/30 hover:text-primary transition-all flex items-center justify-center gap-2 hover-lift"
      >
        <Bell className="h-5 w-5" />
        <span>QUERO SER AVISADA</span>
      </Button>
    </div>
  );
}
