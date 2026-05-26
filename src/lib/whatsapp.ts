import { formatCurrency } from "./format";

interface WhatsAppLinkParams {
  phone: string;
  productName: string;
  size?: string;
  color?: string;
  quantity?: number;
  customerName?: string;
}

interface WhatsAppMessageLinkParams {
  phone: string;
  message: string;
}

interface WhatsAppInterestItem {
  name: string;
  price?: number | string;
}

interface WhatsAppFavoritesLinkParams {
  phone: string;
  items: WhatsAppInterestItem[];
}

function cleanWhatsAppPhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export function generateWhatsAppMessageLink({ phone, message }: WhatsAppMessageLinkParams) {
  return `https://wa.me/${cleanWhatsAppPhone(phone)}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a pre-filled WhatsApp click-to-chat URL.
 * Matches specifications from TECHNICAL.md.
 */
export function generateWhatsAppLink({
  phone,
  productName,
  size,
  color,
  quantity = 1,
  customerName,
}: WhatsAppLinkParams): string {
  let text = "Olá! Tenho interesse nesta peça:\n\n";
  text += `Produto: ${productName}\n`;

  if (color) {
    text += `Cor: ${color}\n`;
  }

  if (size) {
    text += `Tamanho: ${size}\n`;
  }

  text += `Quantidade: ${quantity}\n\n`;

  if (customerName) {
    text += `Meu nome é ${customerName}.\n`;
  }

  text += "Gostaria de saber mais sobre pagamento e entrega.";

  return generateWhatsAppMessageLink({ phone, message: text });
}

export function generateFavoritesWhatsAppLink({ phone, items }: WhatsAppFavoritesLinkParams) {
  let message = "Olá! Tenho interesse nas seguintes peças da Favorita Modas:\n\n";

  items.forEach((item, index) => {
    const price = item.price ? ` (${formatCurrency(item.price)})` : "";
    message += `${index + 1}. ${item.name}${price}\n`;
  });

  message += "\nGostaria de verificar a disponibilidade de tamanhos e cores para estas peças.";

  return generateWhatsAppMessageLink({ phone, message });
}
