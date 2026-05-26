import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { ProductCard } from "./product-card";

// Mock next/link to render standard a tag
vi.mock("next/link", () => {
  return {
    default: ({ children, href, ...props }: React.ComponentProps<"a">) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  };
});

describe("ProductCard Component", () => {
  const defaultProps = {
    id: "1",
    name: "Macacão Pantalona Elegance",
    slug: "macacao-pantalona-elegance",
    price: 189.9,
    status: "AVAILABLE" as const,
    images: [
      { url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f", alt: "Macacão" },
    ],
    categoryName: "Vestuário",
  };

  it("renders standard product card details correctly", () => {
    render(<ProductCard {...defaultProps} />);

    expect(screen.getByRole("heading", { name: "Macacão Pantalona Elegance" })).toBeDefined();
    expect(screen.getByText(/189,90/)).toBeDefined();
    expect(screen.getByText("Ver detalhes")).toBeDefined();
    expect(screen.getByText("Vestuário")).toBeDefined();
  });

  it("renders appropriate status badge for COMING_SOON status", () => {
    render(<ProductCard {...defaultProps} status="COMING_SOON" />);

    expect(screen.getByText("Em breve")).toBeDefined();
    expect(screen.queryByText("Esgotado")).toBeNull();
  });

  it("renders appropriate status badge and list-of-waiting label for UNAVAILABLE status", () => {
    render(<ProductCard {...defaultProps} status="UNAVAILABLE" />);

    expect(screen.getByText("Esgotado")).toBeDefined();
    expect(screen.getByText("Lista de espera")).toBeDefined();
  });
});
