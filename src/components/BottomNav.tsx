import { Icon } from '@/components/Icon'
import { cn } from '@/lib/utils'

const items = [
  { id: 'carta', label: 'Carta', icon: 'local_pizza' },
  { id: 'promos', label: 'Promos', icon: 'redeem' },
  { id: 'secretos', label: 'Secretos', icon: 'skillet' },
  { id: 'pedidos', label: 'Pedidos', icon: 'receipt_long' },
] as const

export function BottomNav({
  active,
  onChange,
}: {
  active: string
  onChange: (id: string) => void
}) {
  return (
    <nav className="fixed bottom-0 z-50 w-full bg-surface/95 pb-safe shadow-[0_-2px_12px_rgba(43,33,24,0.06)] backdrop-blur-xl">
      <div className="flex h-16 items-center justify-around px-space-sm">
        {items.map((item) => {
          const isActive = item.id === active
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={cn(
                'flex min-h-[44px] min-w-[44px] flex-col items-center justify-center px-3 py-1 transition-colors',
                isActive ? 'font-bold text-primary' : 'text-on-surface-variant hover:text-on-surface',
              )}
            >
              <Icon name={item.icon} className="text-[22px]" />
              <span className="mt-0.5 font-label-sm text-label-sm">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
