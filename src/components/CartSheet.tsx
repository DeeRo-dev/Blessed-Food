import { Icon } from '@/components/Icon'
import { WhatsAppCheckoutButton } from '@/components/WhatsAppCheckoutButton'
import type { UseCartReturn } from '@/hooks/useCart'

interface Props {
  cart: UseCartReturn
  open: boolean
  onClose: () => void
}

export function CartSheet({ cart, open, onClose }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <button
        aria-label="Cerrar carrito"
        className="absolute inset-0 bg-[#18181b]/50"
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[80vh] flex-col rounded-t-3xl bg-surface-bright shadow-2xl">
        <div className="flex items-center justify-between border-b border-outline-variant px-space-md py-space-sm">
          <h2 className="font-title-lg text-title-lg text-on-surface">Tu pedido</h2>
          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container text-on-surface-variant"
          >
            <Icon name="close" className="text-[20px]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-space-md py-space-sm">
          {cart.lineItems.length === 0 ? (
            <p className="py-space-lg text-center font-body-sm text-body-sm text-on-surface-variant">
              Todavía no agregaste productos.
            </p>
          ) : (
            <div className="flex flex-col gap-space-sm">
              {cart.lineItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-space-sm rounded-xl bg-surface-container-low p-space-sm"
                >
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-surface-container">
                    <img
                      className="h-full w-full object-cover"
                      src={item.product.image}
                      alt={item.product.name}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-title-sm text-title-sm text-on-surface">
                      {item.product.name}
                    </p>
                    <p className="font-label-md text-label-md text-on-surface-variant">
                      ${item.product.price.toLocaleString('es-AR')} c/u
                    </p>
                    {item.missingUnits > 0 && (
                      <p className="mt-0.5 font-label-sm text-label-sm text-secondary">
                        Faltan {item.missingUnits} para el mínimo de {item.product.minUnits}
                      </p>
                    )}
                    <div className="mt-1.5 flex items-center gap-2 rounded-full bg-surface-container-highest px-1.5 py-1 w-fit">
                      <button
                        type="button"
                        aria-label="Disminuir"
                        onClick={() => cart.decrement(item.product.id)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-container-lowest text-on-surface shadow-sm transition-transform active:scale-90"
                      >
                        <Icon name="remove" className="text-[14px]" />
                      </button>
                      <span className="w-5 text-center font-title-sm text-title-sm text-on-surface">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Aumentar"
                        onClick={() => cart.increment(item.product.id)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-on-primary shadow-sm transition-transform active:scale-90"
                      >
                        <Icon name="add" className="text-[14px]" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 flex-col items-end gap-2">
                    <span className="font-title-sm text-title-sm font-bold text-on-surface">
                      ${item.lineTotal.toLocaleString('es-AR')}
                    </span>
                    <button
                      type="button"
                      aria-label={`Eliminar ${item.product.name}`}
                      onClick={() => cart.removeItem(item.product.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-error transition-colors hover:bg-error-container"
                    >
                      <Icon name="delete" className="text-[18px]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.lineItems.length > 0 && (
          <div className="flex flex-col gap-space-sm border-t border-outline-variant px-space-md py-space-sm pb-safe">
            <div className="flex items-center justify-between">
              <span className="font-title-md text-title-md text-on-surface">Total</span>
              <span className="font-price-tag text-price-tag text-on-surface">
                ${cart.total.toLocaleString('es-AR')}
              </span>
            </div>
            <WhatsAppCheckoutButton cart={cart} className="h-12 shadow-sm" />
          </div>
        )}
      </div>
    </div>
  )
}
