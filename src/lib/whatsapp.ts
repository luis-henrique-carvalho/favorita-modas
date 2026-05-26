interface WhatsAppLinkParams {
  phone: string;
  productName: string;
  size?: string;
  color?: string;
  quantity?: number;
  customerName?: string;
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
  // Sanitize the phone number: keep only digits
  const cleanPhone = phone.replace(/\D/g, "");

  // Build the message sections
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

  // Encode the message
  const encodedText = encodeURIComponent(text);

  // Return formatted WhatsApp link
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}
