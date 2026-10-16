import { Icon } from '@/components/Icon'
import type { Product } from '@/data/products'

interface Props {
  product: Product
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
}

export function ProductCard({ product, quantity, onIncrement, onDecrement }: Props) {
  if (product.isPromo) {
    return (
      <article className="relative flex flex-col gap-space-sm overflow-hidden rounded-xl bg-surface-container-high p-space-sm shadow-sm">
        <div className="flex gap-space-sm">
          <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-surface-container">
            <img
              className="h-full w-full object-cover"
              src={product.image}
              alt={product.name}
            />
            <span className="absolute top-1.5 left-1.5 rounded bg-primary px-1.5 py-0.5 font-label-sm text-label-sm font-bold text-on-primary">
              {product.badge}
            </span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-between">
            <div>
              <div className="flex items-center gap-1">
                <Icon name="stars" className="text-[16px] text-primary" />
                <span className="font-label-sm text-label-sm font-bold text-primary">
                  Promo Octubre Blessed
                </span>
              </div>
              <h2 className="mt-0.5 font-title-md text-title-md leading-tight text-on-surface">
                {product.name}
              </h2>
              <p className="mt-1 line-clamp-2 font-body-sm text-body-sm text-on-surface-variant">
                {product.description}
              </p>
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-headline-sm text-headline-sm font-bold text-primary">
                ${product.price.toLocaleString('es-AR')}
              </span>
              {product.originalPrice && (
                <span className="font-label-sm text-label-sm text-on-surface-variant line-through">
                  ${product.originalPrice.toLocaleString('es-AR')}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-surface-container/70 px-space-sm py-1.5 pt-space-xs">
          <span className="flex items-center gap-1 font-label-sm text-label-sm font-bold text-primary">
            <Icon name="redeem" className="text-[16px]" />
            {product.noteText}
          </span>
          <div className="flex items-center gap-2 rounded-full bg-surface-container-highest px-1.5 py-1">
            <button
              type="button"
              aria-label="Disminuir"
              onClick={onDecrement}
              disabled={quantity === 0}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-container-lowest text-on-surface shadow-sm transition-transform active:scale-90 disabled:opacity-40"
            >
              <Icon name="remove" className="text-[16px]" />
            </button>
            <span className="w-5 text-center font-title-md text-title-md text-on-surface">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Aumentar"
              onClick={onIncrement}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-on-primary shadow-sm transition-transform active:scale-90"
            >
              <Icon name="add" className="text-[16px]" />
            </button>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="relative flex flex-col gap-space-sm overflow-hidden rounded-xl bg-surface-container-low p-space-sm shadow-sm">
      <div className="flex gap-space-sm">
        <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-surface-container">
          <img className="h-full w-full object-cover" src={product.image} alt={product.name} />
          <span className="absolute top-1.5 left-1.5 rounded bg-surface-container-lowest/90 px-1.5 py-0.5 font-label-sm text-label-sm text-primary backdrop-blur-sm">
            {product.badge}
          </span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <h2 className="font-title-md text-title-md leading-tight text-on-surface">
              {product.name}
            </h2>
            <p className="mt-1 line-clamp-2 font-body-sm text-body-sm text-on-surface-variant">
              {product.description}
            </p>
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
              ${product.price.toLocaleString('es-AR')}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">c/u</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-lg bg-surface-container/50 px-space-sm py-1.5 pt-space-xs">
        <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
          <Icon name="task_alt" className="text-[16px] text-tertiary" />
          {product.noteText}
        </span>
        {quantity === 0 ? (
          <button
            type="button"
            onClick={onIncrement}
            className="flex h-8 items-center gap-1 rounded-full bg-primary-container px-3 font-label-md text-label-md text-on-primary-container shadow-sm transition-transform active:scale-95"
          >
            <Icon name="add" className="text-[16px]" />
            <span>Agregar</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 rounded-full bg-surface-container-highest px-1.5 py-1">
            <button
              type="button"
              aria-label="Disminuir"
              onClick={onDecrement}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-container-lowest text-on-surface shadow-sm transition-transform active:scale-90"
            >
              <Icon name="remove" className="text-[16px]" />
            </button>
            <span className="w-5 text-center font-title-md text-title-md text-on-surface">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Aumentar"
              onClick={onIncrement}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-on-primary shadow-sm transition-transform active:scale-90"
            >
              <Icon name="add" className="text-[16px]" />
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
