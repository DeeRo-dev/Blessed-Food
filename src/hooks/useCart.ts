import { useCallback, useEffect, useMemo, useState } from 'react'

import { business, type Product } from '@/data/products'

type CartState = Record<string, number>

const STORAGE_KEY = 'blessed-food-cart'

function readInitialCart(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CartState) : {}
  } catch {
    return {}
  }
}

export function useCart(products: Product[]) {
  const [cart, setCart] = useState<CartState>(readInitialCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const increment = useCallback((productId: string) => {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] ?? 0) + 1 }))
  }, [])

  const decrement = useCallback((productId: string) => {
    setCart((prev) => {
      const current = prev[productId] ?? 0
      if (current <= 1) {
        const next = { ...prev }
        delete next[productId]
        return next
      }
      return { ...prev, [productId]: current - 1 }
    })
  }, [])

  const lineItems = useMemo(
    () =>
      products
        .filter((product) => (cart[product.id] ?? 0) > 0)
        .map((product) => {
          const quantity = cart[product.id]
          const lineTotal = product.price * quantity
          return { product, quantity, lineTotal }
        }),
    [cart, products],
  )

  const totalItems = useMemo(() => lineItems.reduce((sum, item) => sum + item.quantity, 0), [lineItems])

  const totalUnits = useMemo(
    () => lineItems.reduce((sum, item) => sum + item.quantity * item.product.unitsPerItem, 0),
    [lineItems],
  )

  const total = useMemo(() => lineItems.reduce((sum, item) => sum + item.lineTotal, 0), [lineItems])

  const belowMinimum = totalItems > 0 && totalUnits < business.minUnits

  const whatsappUrl = useMemo(() => {
    if (lineItems.length === 0) return null
    const lines = lineItems.map(
      (item) =>
        `- ${item.quantity}x ${item.product.name} ($${item.lineTotal.toLocaleString('es-AR')})`,
    )
    const message = [
      `Hola ${business.name}, quiero hacer el siguiente pedido:`,
      ...lines,
      `Total: $${total.toLocaleString('es-AR')}`,
    ].join('\n')
    return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`
  }, [lineItems, total])

  const clearCart = useCallback(() => setCart({}), [])

  return {
    cart,
    lineItems,
    totalItems,
    totalUnits,
    total,
    belowMinimum,
    whatsappUrl,
    increment,
    decrement,
    clearCart,
  }
}

export type UseCartReturn = ReturnType<typeof useCart>
