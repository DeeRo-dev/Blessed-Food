import { Icon } from '@/components/Icon'
import type { Section } from '@/data/products'
import { cn } from '@/lib/utils'

const sections: { id: Section; label: string; icon: string }[] = [
  { id: 'Salados', label: 'Salados', icon: 'local_pizza' },
  { id: 'Dulces', label: 'Dulces', icon: 'cake' },
]

interface Props {
  active: Section
  onChange: (section: Section) => void
}

export function SectionTabs({ active, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 px-space-md pt-space-sm">
      {sections.map((section) => {
        const isActive = section.id === active
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onChange(section.id)}
            className={cn(
              'flex items-center justify-center gap-1.5 rounded-xl py-2.5 font-title-sm text-title-sm transition-colors',
              isActive
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high',
            )}
          >
            <Icon name={section.icon} className="text-[18px]" />
            {section.label}
          </button>
        )
      })}
    </div>
  )
}
