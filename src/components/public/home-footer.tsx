import Link from "next/link";
import { Button } from "@/components/ui/button";
import { generateWhatsAppMessageLink } from "@/lib/whatsapp";

interface HomeFooterProps {
  whatsappPhone: string;
}

export function HomeFooter({ whatsappPhone }: HomeFooterProps) {
  const whatsappUrl = generateWhatsAppMessageLink({
    phone: whatsappPhone,
    message: "Olá! Gostaria de falar com a Favorita Modas.",
  });

  return (
    <footer
      className="w-full border-t border-outline-variant/30 bg-surface-container-low py-10 text-center"
      id="contato"
    >
      <div className="container-boutique flex flex-col items-center gap-6">
        <h2 className="font-heading text-xl font-bold tracking-normal text-primary">
          Favorita Modas
        </h2>

        <nav className="flex flex-wrap justify-center gap-2" aria-label="Links da loja">
          <Button asChild variant="link" size="sm">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </Button>
          <Button asChild variant="link" size="sm">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </Button>
          <Button asChild variant="link" size="sm">
            <Link href="#sobre">Sobre</Link>
          </Button>
        </nav>

        <div className="flex flex-col gap-1 text-xs text-outline">
          <p>© 2026 Favorita Modas. Exclusividade em cada detalhe.</p>
          <p>Desenvolvido para conversão direta no WhatsApp.</p>
        </div>
      </div>
    </footer>
  );
}
