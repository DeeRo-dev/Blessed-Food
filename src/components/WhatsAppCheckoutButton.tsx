import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { useState } from 'react'

import { Icon } from '@/components/Icon'
import type { UseCartReturn } from '@/hooks/useCart'
import { cn } from '@/lib/utils'

interface Props {
  cart: UseCartReturn
  className?: string
}

export function WhatsAppCheckoutButton({ cart, className }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <a
        className={cn(
          'flex items-center justify-center gap-1.5 rounded-full bg-[#25D366] font-label-lg text-label-lg text-on-primary transition-all hover:brightness-105 active:scale-95',
          className,
        )}
        href={cart.whatsappUrl ?? undefined}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => {
          if (cart.itemsBelowMinimum.length > 0) {
            event.preventDefault()
            setOpen(true)
          }
        }}
      >
        <Icon name="chat" className="text-[20px]" />
        <span className="tracking-tight">Pedir por WhatsApp</span>
      </a>

      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 z-[60] bg-[#18181b]/50" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 z-[60] w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-surface-bright p-space-md shadow-2xl outline-none">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
                <Icon name="error" className="text-[20px]" />
              </div>
              <AlertDialog.Title className="font-title-lg text-title-lg text-on-surface">
                Todavía no llegás al mínimo
              </AlertDialog.Title>
            </div>
            <AlertDialog.Description asChild>
              <div className="mt-space-sm flex flex-col gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
                {cart.itemsBelowMinimum.map((item) => (
                  <span key={item.product.id}>
                    <strong className="font-semibold text-on-surface">{item.product.name}</strong>:
                    faltan {item.missingUnits} unidades para el mínimo de {item.product.minUnits}.
                  </span>
                ))}
              </div>
            </AlertDialog.Description>
            <div className="mt-space-md flex gap-2">
              <AlertDialog.Cancel asChild>
                <button
                  type="button"
                  className="flex-1 rounded-full bg-surface-container px-4 py-2.5 font-label-lg text-label-lg text-on-surface-variant transition-colors hover:bg-surface-container-high"
                >
                  Volver y corregir
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <a
                  href={cart.whatsappUrl ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2.5 font-label-lg text-label-lg text-on-primary transition-all hover:brightness-105"
                >
                  Pedir igual
                </a>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  )
}
