// ============================================
// PROCESSOR — Filtra y calcula estadísticas
// ============================================

import type { Product, ProductSummary } from './types.js';

export function filterByCategory(
  products: Product[],
  categoryFilter: string | null
): Product[] {
  if (categoryFilter === null) {
    return products;
  }

  const filtered = products.filter(
    (p) => p.category.toLowerCase() === categoryFilter.toLowerCase()
  );

  if (filtered.length === 0) {
    const availableCategories = Array.from(
      new Set(products.map((p) => p.category))
    );
    throw new Error(
      `No hay productos en la categoría "${categoryFilter}". ` +
        `Categorías disponibles: ${availableCategories.join(', ')}`
    );
  }

  return filtered;
}

export function calculateSummary(products: Product[]): ProductSummary {
  const total = products.length;
  const active = products.filter((p) => p.active).length;
  const inactive = products.filter((p) => !p.active).length;

  const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
  const averagePrice = Number((totalPrice / total).toFixed(2));

  const mostExpensive = products.reduce((max, p) =>
    p.price > max.price ? p : max
  );
  const cheapest = products.reduce((min, p) => (p.price < min.price ? p : min));

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return {
    total,
    active,
    inactive,
    averagePrice,
    mostExpensive,
    cheapest,
    categories,
  };
}
