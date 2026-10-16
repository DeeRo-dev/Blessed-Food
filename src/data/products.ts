import cebolla from '@/assets/products/cebolla.jpg'
import integral from '@/assets/products/integral.jpg'
import muzzarella from '@/assets/products/muzzarella.jpg'
import tomate from '@/assets/products/tomate.jpg'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  unitsPerItem: number
  image: string
  badge: string
  category: string
  noteText: string
  isPromo: boolean
}

const rawPhone = (import.meta.env.NUM_TELEPHONE || '1158209237').replace(/\D/g, '')

function formatPhoneDisplay(digits: string): string {
  if (digits.length !== 10) return digits
  return `${digits.slice(0, 2)} ${digits.slice(2, 6)}-${digits.slice(6)}`
}

export const business = {
  name: 'Blessed Food',
  initials: 'BF',
  whatsapp: `549${rawPhone}`,
  whatsappDisplay: formatPhoneDisplay(rawPhone),
  minUnits: 6,
}

export const sheetConfig = {
  spreadsheetId: import.meta.env.SHEET_ID,
  sheetName: 'Productos',
}

/** Se usa si todavía no se compartió la planilla o falla la conexión. */
export const fallbackProducts: Product[] = [
  {
    id: 'promo-muzza-6x5',
    name: 'Promo 6 Pizzas Muzzarella (Pagás 5)',
    description:
      'Si llevás 6 unidades de muzzarella, ¡te regalamos una! Listas para mandar al horno.',
    price: 36000,
    originalPrice: 43200,
    unitsPerItem: 6,
    image: muzzarella,
    badge: 'PROMO 6x5',
    category: 'Con Muzzarella',
    noteText: '¡Ahorrás $7.200!',
    isPromo: true,
  },
  {
    id: 'pizza-muzzarella',
    name: 'Pizzas Listas para Hornear',
    description: 'Con abundante muzzarella y orégano. Ricas, caseras y listas para tu mesa.',
    price: 7200,
    unitsPerItem: 1,
    image: muzzarella,
    badge: 'Con Muzzarella',
    category: 'Con Muzzarella',
    noteText: 'Abundante queso muzzarella',
    isPromo: false,
  },
  {
    id: 'prepizza-tomate',
    name: 'Prepizzas de Tomate',
    description: 'Salsa de tomate casera cocida a fuego lento y orégano de huerta.',
    price: 2000,
    unitsPerItem: 1,
    image: tomate,
    badge: 'Clásica',
    category: 'Prepizzas Tomate',
    noteText: 'Masa esponjosa casera',
    isPromo: false,
  },
  {
    id: 'prepizza-cebolla',
    name: 'Prepizzas de Cebolla',
    description: 'Cebollas doradas suaves, aceite de oliva y pimienta negra.',
    price: 2300,
    unitsPerItem: 1,
    image: cebolla,
    badge: 'Fugazza',
    category: 'Prepizzas Cebolla',
    noteText: 'Cebolla dorada al horno',
    isPromo: false,
  },
  {
    id: 'prepizza-integral',
    name: 'Prepizzas de Harina Integral',
    description: 'Harina pura de molienda integral, liviana y súper crocante con salsa suave.',
    price: 2600,
    unitsPerItem: 1,
    image: integral,
    badge: 'Integral',
    category: 'Harina Integral',
    noteText: 'Harina integral pura',
    isPromo: false,
  },
]
