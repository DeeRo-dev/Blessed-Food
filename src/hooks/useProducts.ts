import Papa from 'papaparse'
import { useEffect, useState } from 'react'

import { fallbackProducts, sheetConfig, type Product, type Section } from '@/data/products'
import { resolveImageUrl } from '@/lib/driveImage'

function parsePrice(raw: string): number | undefined {
  const cleaned = raw.replace(/[^\d.,-]/g, '').replace(/\./g, '').replace(',', '.')
  const value = Number(cleaned)
  return Number.isFinite(value) && cleaned !== '' ? value : undefined
}

function isTruthy(raw: string): boolean {
  const value = raw.trim().toLowerCase()
  return value === 'true' || value === 'si' || value === 'sí' || value === '1' || value === 'x'
}

function rowToProduct(row: Record<string, string>, index: number): Product | null {
  const name = row['Nombre']?.trim()
  if (!name) return null

  const price = parsePrice(row['Precio'] ?? '')
  if (price === undefined) return null

  const originalPrice = parsePrice(row['Precio Anterior (opcional)'] ?? '')
  const unitsPerItem = parsePrice(row['Unidades por item'] ?? '') || 1
  const minUnits = parsePrice(row['Mínimo de compra (opcional)'] ?? '')
  const activoRaw = row['Activo']?.trim()
  const active = activoRaw ? isTruthy(activoRaw) : true
  const sectionRaw = row['Sección (Dulces/Salados)']?.trim().toLowerCase()
  const section: Section = sectionRaw === 'dulces' ? 'Dulces' : 'Salados'

  if (!active) return null

  return {
    id: `${index}-${name}`,
    name,
    description: row['Descripcion']?.trim() ?? '',
    price,
    originalPrice: originalPrice && originalPrice > price ? originalPrice : undefined,
    unitsPerItem,
    minUnits: minUnits && minUnits > 0 ? minUnits : undefined,
    unitLabel: row['Unidad de venta']?.trim() || 'c/u',
    image: row['Imagen (URL)'] ? resolveImageUrl(row['Imagen (URL)']) : '',
    badge: row['Etiqueta']?.trim() ?? '',
    category: row['Categoria']?.trim() || 'Otros',
    section,
    noteText: row['Nota']?.trim() ?? '',
    isPromo: Boolean(originalPrice && originalPrice > price),
  }
}

async function fetchSheetProducts(): Promise<Product[]> {
  if (!sheetConfig.spreadsheetId) {
    throw new Error('Falta configurar SHEET_ID')
  }
  const url = `https://docs.google.com/spreadsheets/d/${sheetConfig.spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetConfig.sheetName)}&_=${Date.now()}`
  const response = await fetch(url, { cache: 'no-store' })
  if (!response.ok) {
    throw new Error(`No se pudo leer la planilla (status ${response.status})`)
  }
  const csv = await response.text()
  if (csv.trim().startsWith('<')) {
    // Google devuelve una página de error HTML si la hoja no es pública.
    throw new Error('La planilla no es pública todavía')
  }

  const { data } = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
  })

  const products = data
    .map((row, index) => rowToProduct(row, index))
    .filter((product): product is Product => product !== null)

  if (products.length === 0) {
    throw new Error('La planilla no tiene productos activos')
  }

  return products
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts)
  const [source, setSource] = useState<'sheet' | 'fallback'>('fallback')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetchSheetProducts()
      .then((sheetProducts) => {
        if (cancelled) return
        setProducts(sheetProducts)
        setSource('sheet')
      })
      .catch((error) => {
        console.warn('Usando catálogo de respaldo:', error.message)
        if (cancelled) return
        setProducts(fallbackProducts)
        setSource('fallback')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { products, source, loading }
}
