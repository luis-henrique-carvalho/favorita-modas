import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { WhatsAppButton } from "./whatsapp-button";

// Mock lucide-react to avoid icon loading issues in test
vi.mock("lucide-react", () => ({
  MessageCircle: () => <div data-testid="message-circle-icon" />,
}));

describe("WhatsAppButton Component", () => {
  it("renders the inline button correctly with custom label", () => {
    render(
      <WhatsAppButton
        variant="inline"
        productName="Vestido Longo Rose"
        size="P"
        color="Rose"
        label="Comprar no WhatsApp"
      />,
    );

    const buttonLink = screen.getByRole("link", { name: /comprar no whatsapp/i });
    expect(buttonLink).toBeDefined();
    expect(buttonLink.getAttribute("href")).toContain("https://wa.me/5575999999999?text=");

    // Decodes the URL and checks details
    const textPart = decodeURIComponent(buttonLink.getAttribute("href")!.split("?text=")[1]);
    expect(textPart).toContain("Produto: Vestido Longo Rose");
    expect(textPart).toContain("Cor: Rose");
    expect(textPart).toContain("Tamanho: P");
  });

  it("renders the floating button correctly as FAB with correct aria-label", () => {
    render(
      <WhatsAppButton variant="floating" productName="Vestido Longo Rose" phone="5511999999999" />,
    );

    const buttonLink = screen.getByRole("link", { name: /falar conosco no whatsapp/i });
    expect(buttonLink).toBeDefined();
    expect(buttonLink.getAttribute("href")).toContain("https://wa.me/5511999999999?text=");
    expect(screen.getByTestId("message-circle-icon")).toBeDefined();
  });
});
