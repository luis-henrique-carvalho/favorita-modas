import { test, expect } from "@playwright/test";

test("should load the public catalog home and display the boutique hero", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "A beleza de ser única em cada detalhe." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Descobrir coleção" })).toBeVisible();
});

test("should navigate to the admin page correctly", async ({ page }) => {
  await page.goto("/admin");

  // Verify restrict access text is present
  const painelRestrito = page.locator("text=Painel Restrito");
  await expect(painelRestrito).toBeVisible();

  // Verify restrict warning header is present
  const adminHeader = page.locator("h1");
  await expect(adminHeader).toContainText("Favorita Modas — Admin");
});
