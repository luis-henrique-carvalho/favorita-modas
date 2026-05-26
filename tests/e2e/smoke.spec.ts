import { test, expect } from "@playwright/test";

test("should load the home page (Cloudinary Lab validation stack) and display correct title", async ({
  page,
}) => {
  await page.goto("/");

  // Verify that the header contains 'Favorita Modas — Cloudinary Lab'
  const header = page.locator("h1");
  await expect(header).toContainText("Favorita Modas — Cloudinary Lab");
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
