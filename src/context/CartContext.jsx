import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'marketplace-cart'

const CartContext = createContext(null)

function normalizeCartItem(item) {
  if (!item || typeof item !== 'object') return null

  const price = Number(item.price)
  const quantity = Number(item.quantity)

  if (
    item.id == null ||
    typeof item.title !== 'string' ||
    item.title.trim() === '' ||
    !Number.isFinite(price) ||
    typeof item.thumbnail !== 'string' ||
    !Number.isFinite(quantity) ||
    quantity < 1
  ) {
    return null
  }

  return {
    id: item.id,
    title: item.title,
    price,
    thumbnail: item.thumbnail,
    quantity: Math.floor(quantity),
  }
}

// Missing or invalid storage becomes an empty cart instead of crashing.
function readStoredCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed.map(normalizeCartItem).filter(Boolean)
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(readStoredCart)

  // Persist every cart change, including an empty cart.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  function addToCart(product, quantity = 1) {
    const amount = Math.max(1, Math.floor(Number(quantity)) || 1)
    const stock = Number(product?.stock)

    setCartItems((items) => {
      const existing = items.find((item) => item.id === product.id)
      const current = existing ? existing.quantity : 0
      // The same product stays on one row and cannot pass its stock.
      const nextQuantity = Number.isFinite(stock)
        ? Math.min(current + amount, stock)
        : current + amount

      if (nextQuantity < 1 || nextQuantity === current) return items

      if (existing) {
        return items.map((item) =>
          item.id === product.id ? { ...item, quantity: nextQuantity } : item,
        )
      }

      const nextItem = normalizeCartItem({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail ?? '',
        quantity: nextQuantity,
      })

      return nextItem ? [...items, nextItem] : items
    })
  }

  function removeFromCart(productId) {
    setCartItems((items) => items.filter((item) => item.id !== productId))
  }

  function clearCart() {
    setCartItems([])
  }

  function increaseQuantity(productId) {
    setCartItems((items) =>
      items.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    )
  }

  function decreaseQuantity(productId) {
    setCartItems((items) =>
      items.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      ),
    )
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react/only-export-components -- paired with CartProvider
export function useCart() {
  const cart = useContext(CartContext)

  if (!cart) {
    throw new Error('useCart must be used within CartProvider')
  }

  return cart
}
