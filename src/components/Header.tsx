import { useLayoutEffect, useRef } from 'react'

import { Icon } from '@/components/Icon'
import { business } from '@/data/products'

export function Header() {
  const headerRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const node = headerRef.current
    if (!node) return

    const syncHeight = () => {
      document.documentElement.style.setProperty('--header-h', `${node.offsetHeight}px`)
    }
    syncHeight()

    const observer = new ResizeObserver(syncHeight)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <header
      ref={headerRef}
      className="fixed top-0 z-50 w-full bg-surface/90 pt-safe shadow-[0_1px_8px_rgba(43,33,24,0.05)] backdrop-blur-xl"
    >
      <div className="flex h-20 items-center justify-between gap-space-sm px-space-md">
        <div className="flex min-w-0 items-center gap-space-sm">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary font-headline-sm text-headline-sm font-bold text-on-primary shadow-sm">
            {business.initials}
          </div>
          <div className="flex min-w-0 flex-col">
            <div className="flex items-center gap-space-xs">
              <span className="truncate font-title-md text-title-md font-bold text-on-surface">
                {business.name} ♡
              </span>
            </div>
            <div className="mt-space-2xs flex items-center gap-space-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-tertiary-fixed px-2 py-0.5 font-label-sm text-label-sm text-on-tertiary-fixed">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tertiary" />
                Mín. {business.minUnits} unidades en adelante
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-space-xs">
          <a
            aria-label="WhatsApp Pedidos"
            className="flex min-h-[44px] items-center justify-center gap-1 rounded-full bg-[#25D366] px-2.5 text-on-primary shadow-[0_2px_8px_rgba(37,211,102,0.25)] transition-all hover:opacity-95"
            href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
              `Hola ${business.name}, quiero hacer un pedido`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="chat" className="text-[20px]" />
            <span className="pr-1 font-label-sm text-label-sm font-bold">
              {business.whatsappDisplay}
            </span>
          </a>
        </div>
      </div>
      <div className="flex items-center justify-between px-space-md pb-space-xs">
        <span className="font-title-md text-title-md text-on-surface">Ricas, caseras y listas ♡</span>
        <span className="font-label-sm text-label-sm font-bold text-primary">Listas para hornear</span>
      </div>
    </header>
  )
}
