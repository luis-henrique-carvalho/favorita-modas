import { describe, it, expect } from "vitest";
import { generateWhatsAppLink } from "./whatsapp";

describe("WhatsApp Link Generator", () => {
  it("should generate a correct WhatsApp link with only product name", () => {
    const link = generateWhatsAppLink({
      phone: "5575999999999",
      productName: "Vestido Floral Midi",
    });

    expect(link).toContain("https://wa.me/5575999999999?text=");

    const textPart = decodeURIComponent(link.split("?text=")[1]);
    expect(textPart).toContain("Produto: Vestido Floral Midi");
    expect(textPart).toContain("Olá! Tenho interesse nesta peça:");
    expect(textPart).toContain("Gostaria de saber mais sobre pagamento e entrega.");
  });

  it("should format WhatsApp link with all optionals", () => {
    const link = generateWhatsAppLink({
      phone: "+55 (75) 99999-9999",
      productName: "Vestido Floral Midi",
      color: "Azul",
      size: "M",
      quantity: 2,
      customerName: "Ana Maria",
    });

    // Sanitizes phone number correctly
    expect(link).toContain("https://wa.me/5575999999999?text=");

    const textPart = decodeURIComponent(link.split("?text=")[1]);
    expect(textPart).toContain("Produto: Vestido Floral Midi");
    expect(textPart).toContain("Cor: Azul");
    expect(textPart).toContain("Tamanho: M");
    expect(textPart).toContain("Quantidade: 2");
    expect(textPart).toContain("Meu nome é Ana Maria.");
  });
});
