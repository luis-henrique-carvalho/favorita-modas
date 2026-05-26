"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink, generateWhatsAppMessageLink } from "@/lib/whatsapp";

interface WhatsAppButtonProps extends React.ComponentProps<"a"> {
  variant?: "inline" | "floating";
  productName?: string;
  size?: string;
  color?: string;
  quantity?: number;
  customerName?: string;
  phone?: string;
  label?: string;
  message?: string;
}

export function WhatsAppButton({
  variant = "inline",
  productName,
  size,
  color,
  quantity = 1,
  customerName,
  phone = "5575999999999", // Default fallback from boutique config
  label = "Demonstrar Interesse pelo WhatsApp",
  message,
  className,
  ...props
}: WhatsAppButtonProps) {
  const url = message
    ? generateWhatsAppMessageLink({ phone, message })
    : productName
      ? generateWhatsAppLink({
          phone,
          productName,
          size,
          color,
          quantity,
          customerName,
        })
      : `https://wa.me/${phone.replace(/\D/g, "")}`;

  if (variant === "floating") {
    return (
      <Button
        asChild
        size="icon-lg"
        className={cn(
          "fixed right-4 bottom-20 z-50 size-12 rounded-full shadow-floating hover-lift md:right-6 md:bottom-6",
          className,
        )}
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar conosco no WhatsApp"
          {...props}
        >
          <MessageCircle />
        </a>
      </Button>
    );
  }

  return (
    <Button
      asChild
      size="lg"
      className={cn("w-full rounded-lg font-semibold shadow-soft hover-lift", className)}
    >
      <a href={url} target="_blank" rel="noopener noreferrer" {...props}>
        <MessageCircle data-icon="inline-start" />
        <span>{label}</span>
      </a>
    </Button>
  );
}
