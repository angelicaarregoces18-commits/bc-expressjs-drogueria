// ============================================
// ENTRY POINT — Orquesta todo el flujo
// Dominio: Droguería / Minimercado
// ============================================

import { readProducts } from './reader.js';
import { filterByCategory, calculateSummary } from './processor.js';
import { writeReport } from './writer.js';
import type { Report } from './types.js';

async function main(): Promise<void> {
  try {
    const args = process.argv.slice(2);
    const categoryIndex = args.indexOf('--category');
    const categoryFilter: string | null =
      categoryIndex !== -1 ? args[categoryIndex + 1] : null;

    const products = await readProducts();
    const filtered = filterByCategory(products, categoryFilter);
    const summary = calculateSummary(filtered);

    const report: Report = {
      generatedAt: new Date().toISOString(),
      appliedFilter: categoryFilter,
      summary,
      products: filtered,
    };

    console.log('📦 Resumen del catálogo — Droguería / Minimercado\n');
    console.log(`Total de productos: ${summary.total}`);
    console.log(`Activos: ${summary.active} | Inactivos: ${summary.inactive}`);
    console.log(`Precio promedio: $${summary.averagePrice}`);
    console.log(
      `Más caro: ${summary.mostExpensive.name} ($${summary.mostExpensive.price})`
    );
    console.log(
      `Más barato: ${summary.cheapest.name} ($${summary.cheapest.price})`
    );
    console.log(`Categorías: ${summary.categories.join(', ')}`);

    await writeReport(report);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`\n❌ Error: ${message}`);
    process.exit(1);
  }
}

main();
