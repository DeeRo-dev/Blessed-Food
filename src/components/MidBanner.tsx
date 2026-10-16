import { Icon } from '@/components/Icon'
import { business } from '@/data/products'

export function MidBanner() {
  return (
    <div className="relative my-space-xs overflow-hidden rounded-xl bg-gradient-to-r from-secondary-container/70 to-surface-container-high p-space-md shadow-sm">
      <div className="flex items-center gap-space-sm">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-on-secondary shadow-sm">
          <Icon name="inventory_2" className="text-[24px]" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="font-label-sm text-label-sm font-bold tracking-wider text-on-secondary-container uppercase">
            Condición de compra
          </span>
          <p className="mt-0.5 font-title-sm text-title-sm leading-tight text-on-surface">
            Pedidos desde {business.minUnits} unidades en adelante
          </p>
          <p className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
            ¡Hacé tu pedido con anticipación por WhatsApp al {business.whatsappDisplay}!
          </p>
        </div>
      </div>
    </div>
  )
}

export function FootNote() {
  return (
    <div className="mb-2 flex items-center justify-center gap-2 rounded-lg bg-surface-container/60 p-space-sm text-center">
      <Icon name="skillet" className="text-[18px] text-secondary" />
      <span className="font-body-sm text-body-sm text-on-surface-variant">
        {business.name}: Calidad y sabor casero. Listas para hornear y disfrutar.
      </span>
    </div>
  )
}
