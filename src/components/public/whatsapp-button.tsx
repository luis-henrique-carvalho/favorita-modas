"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateWhatsAppLink } from "@/lib/whatsapp";

interface WhatsAppButtonProps extends React.ComponentProps<"a"> {
  variant?: "inline" | "floating";
  productName?: string;
  size?: string;
  color?: string;
  quantity?: number;
  customerName?: string;
  phone?: string;
  label?: string;
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
  className,
  ...props
}: WhatsAppButtonProps) {
  // Generate WhatsApp link on the fly
  const url = productName
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
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar conosco no WhatsApp"
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-floating transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-primary-container group/fab",
          "after:absolute after:inset-0 after:-z-10 after:rounded-full after:bg-primary/20 after:animate-ping hover:after:animate-none",
          className,
        )}
        {...props}
      >
        <MessageCircle className="size-6 transition-transform duration-300 group-hover/fab:rotate-12" />
      </a>
    );
  }

  // Inline Button
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all duration-200 hover-lift hover:bg-primary-container active:translate-y-px select-none",
        className,
      )}
      {...props}
    >
      <MessageCircle className="size-5" />
      <span>{label}</span>
    </a>
  );
}
