export function formatCurrency(value: number | string) {
  const numericValue = typeof value === "string" ? Number.parseFloat(value) : value;

  if (Number.isNaN(numericValue)) {
    return "R$ 0,00";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
    .format(numericValue)
    .replace(/\u00a0/g, " ");
}
