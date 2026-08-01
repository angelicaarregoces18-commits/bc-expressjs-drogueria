# Semana 01 — Procesador de Datos con Node.js

**Dominio asignado:** Droguería / Minimercado
**Recurso principal:** `Product` (products, sales, suppliers, inventory)

## Descripción

Herramienta de línea de comandos (CLI) construida con **Node.js + TypeScript**
que lee el catálogo de productos de una droguería/minimercado desde
`data/products.json`, calcula un resumen (total, activos/inactivos, precio
promedio, más caro/barato, categorías), permite filtrar por categoría y
genera un reporte en `output/report.json`.

## Cómo correr el proyecto

```bash
pnpm install
pnpm dev                          # sin filtro — muestra todo el catálogo
pnpm dev -- --category medicamentos   # filtrado por categoría
pnpm build                        # verifica que compila sin errores TS
```

## Categorías disponibles en el dataset

`medicamentos`, `abarrotes`, `cuidado_personal`, `lacteos`

## Estructura

```
src/
├── types.ts       # interfaz Product, ProductSummary, Report
├── reader.ts       # lee data/products.json
├── processor.ts     # filterByCategory, calculateSummary
├── writer.ts       # escribe output/report.json
└── index.ts       # orquesta el flujo (CLI entry point)
data/products.json   # catálogo de ejemplo (12 productos)
```
