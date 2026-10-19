import { useEffect, useMemo, useState } from 'react'

import { AmbientBanner } from '@/components/AmbientBanner'
import { CartSheet } from '@/components/CartSheet'
import { CategoryChips } from '@/components/CategoryChips'
import { Header } from '@/components/Header'
import { FootNote, MidBanner } from '@/components/MidBanner'
import { ProductCard } from '@/components/ProductCard'
import { SectionTabs } from '@/components/SectionTabs'
import { StickyCheckoutBar } from '@/components/StickyCheckoutBar'
import type { Section } from '@/data/products'
import { useCart } from '@/hooks/useCart'
import { useProducts } from '@/hooks/useProducts'

function App() {
  const { products } = useProducts()
  const [activeSection, setActiveSection] = useState<Section>('Salados')
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [cartOpen, setCartOpen] = useState(false)
  const cart = useCart(products)

  const productsInSection = useMemo(
    () => products.filter((product) => product.section === activeSection),
    [products, activeSection],
  )

  const categories = useMemo(
    () => ['Todos', ...Array.from(new Set(productsInSection.map((product) => product.category)))],
    [productsInSection],
  )

  useEffect(() => {
    setActiveCategory('Todos')
  }, [activeSection])

  const visibleProducts = useMemo(
    () =>
      activeCategory === 'Todos'
        ? productsInSection
        : productsInSection.filter((product) => product.category === activeCategory),
    [activeCategory, productsInSection],
  )

  return (
    <main
      className="relative flex min-h-screen w-full flex-col bg-surface"
      style={{ paddingTop: 'var(--header-h, 6rem)' }}
    >
      <Header />
      <div className="flex w-full flex-col pb-28">
        <AmbientBanner />
        <SectionTabs active={activeSection} onChange={setActiveSection} />
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

      <StickyCheckoutBar cart={cart} onOpenCart={() => setCartOpen(true)} />
      <CartSheet cart={cart} open={cartOpen} onClose={() => setCartOpen(false)} />
    </main>
  )
}

export default App
