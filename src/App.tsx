import { useMemo, useState } from 'react'

import { AmbientBanner } from '@/components/AmbientBanner'
import { CategoryChips } from '@/components/CategoryChips'
import { Header } from '@/components/Header'
import { FootNote, MidBanner } from '@/components/MidBanner'
import { ProductCard } from '@/components/ProductCard'
import { StickyCheckoutBar } from '@/components/StickyCheckoutBar'
import { useCart } from '@/hooks/useCart'
import { useProducts } from '@/hooks/useProducts'

function App() {
  const { products } = useProducts()
  const [activeCategory, setActiveCategory] = useState('Todos')
  const cart = useCart(products)

  const categories = useMemo(
    () => ['Todos', ...Array.from(new Set(products.map((product) => product.category)))],
    [products],
  )

  const visibleProducts = useMemo(
    () =>
      activeCategory === 'Todos'
        ? products
        : products.filter((product) => product.category === activeCategory),
    [activeCategory, products],
  )

  return (
    <main
      className="relative flex min-h-screen w-full flex-col bg-surface"
      style={{ paddingTop: 'var(--header-h, 6rem)' }}
    >
      <Header />
      <div className="flex w-full flex-col pb-28">
        <AmbientBanner />
        <CategoryChips categories={categories} active={activeCategory} onChange={setActiveCategory} />

        <div className="mt-space-xs flex flex-col gap-space-md px-space-md">
          {visibleProducts.map((product, index) => (
            <div key={product.id} className="contents">
              <ProductCard
                product={product}
                quantity={cart.cart[product.id] ?? 0}
                onIncrement={() => cart.increment(product.id)}
                onDecrement={() => cart.decrement(product.id)}
              />
              {index === 1 && <MidBanner />}
            </div>
          ))}
          <FootNote />
        </div>
      </div>

      <StickyCheckoutBar cart={cart} />
    </main>
  )
}

export default App
