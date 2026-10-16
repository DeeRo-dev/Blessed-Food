import { Icon } from '@/components/Icon'
import { cn } from '@/lib/utils'

interface Props {
  categories: string[]
  active: string
  onChange: (category: string) => void
}

export function CategoryChips({ categories, active, onChange }: Props) {
  return (
    <div className="px-space-md pb-space-xs pt-space-sm">
      <div className="no-scrollbar flex items-center gap-space-xs overflow-x-auto py-1">
        {categories.map((category) => {
          const isActive = category === active
          return (
            <button
              key={category}
              type="button"
              onClick={() => onChange(category)}
              className={cn(
                'flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-1.5 font-label-md text-label-md transition-transform active:scale-95',
                isActive
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high',
              )}
            >
              {isActive && <Icon name="done" className="text-[14px]" />}
              <span>{category}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
