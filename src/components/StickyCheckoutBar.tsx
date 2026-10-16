import { Icon } from '@/components/Icon'
import type { UseCartReturn } from '@/hooks/useCart'

export function StickyCheckoutBar({ cart }: { cart: UseCartReturn }) {
  if (cart.totalItems === 0) return null

  const label =
    cart.lineItems.length === 1
      ? cart.lineItems[0].product.name
      : `${cart.lineItems.length} productos distintos`

  return (
    <aside className="fixed bottom-4 left-3 right-3 z-40 mx-auto max-w-md">
      {cart.itemsBelowMinimum.length > 0 && (
        <div className="mb-2 flex flex-col gap-1 rounded-xl bg-surface-container-highest px-3 py-2 text-center font-label-sm text-label-sm text-on-surface-variant shadow-sm">
          {cart.itemsBelowMinimum.map((item) => (
            <span key={item.product.id}>
              {item.product.name}: faltan {item.missingUnits} unidades para el mínimo de{' '}
              {item.product.minUnits}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between gap-2 rounded-full bg-inverse-surface p-2 pr-2 pl-4 text-inverse-on-surface shadow-2xl shadow-[0_12px_36px_rgba(43,33,24,0.3)]">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-surface/15">
            <Icon name="shopping_bag" className="text-[22px] text-inverse-on-surface" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary font-label-sm text-label-sm font-bold text-on-primary">
              {cart.totalItems}
            </span>
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-label-sm text-label-sm text-inverse-on-surface/75">
              {label}
            </span>
            <span className="font-price-tag text-price-tag leading-none text-inverse-on-surface">
              ${cart.total.toLocaleString('es-AR')}
            </span>
          </div>
        </div>
        <a
          className="flex h-11 flex-shrink-0 items-center gap-1.5 rounded-full bg-[#25D366] px-4 font-label-lg text-label-lg text-on-primary shadow-[0_2px_10px_rgba(37,211,102,0.35)] transition-all hover:brightness-105 active:scale-95"
          href={cart.whatsappUrl ?? undefined}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="chat" className="text-[20px]" />
          <span className="tracking-tight">Pedir por WhatsApp</span>
        </a>
      </div>
    </aside>
  )
}
