import { Icon } from '@/components/Icon'
import { business } from '@/data/products'

export function AmbientBanner() {
  return (
    <div className="px-space-md pb-space-xs pt-space-sm">
      <div className="relative overflow-hidden rounded-xl bg-surface-container-high p-space-md shadow-sm">
        <div className="pointer-events-none absolute -right-4 -bottom-4 h-28 w-28 rounded-full bg-secondary-container/40 blur-xl" />
        <div className="relative z-10 flex items-start gap-space-sm">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-container text-on-primary-container shadow-sm">
            <Icon name="local_fire_department" className="text-[22px]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-on-surface">
                {business.name}
              </span>
              <span className="rounded-full bg-secondary-container px-2 py-0.5 font-label-sm text-label-sm text-on-secondary-container">
                ¡Hacé tu pedido con anticipación!
              </span>
            </div>
            <p className="mt-1 font-body-sm text-body-sm leading-snug text-on-surface-variant">
              Elaboración propia • Excelente calidad • Ricas, caseras y listas para que las
              disfrutes en tu mesa.
            </p>
          </div>
        </div>
        <div className="mt-space-sm flex items-center justify-between gap-2 rounded-lg bg-surface-container/70 px-space-sm py-1.5 pt-space-xs text-on-surface-variant">
          <div className="flex min-w-0 items-center gap-1.5 truncate">
            <Icon name="favorite" className="text-[16px] text-primary" />
            <span className="truncate font-label-md text-label-md font-medium text-primary">
              Promo: Si llevás 6, pagás 5
            </span>
          </div>
          <div className="flex flex-shrink-0 items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            <span className="font-label-sm text-label-sm font-bold text-on-surface">
              Mín. {business.minUnits} unidades
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
