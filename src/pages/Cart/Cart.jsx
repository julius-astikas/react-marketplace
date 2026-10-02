import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import CartItem from './CartItem'
import CheckoutPanel from './CheckoutPanel'
import styles from './Cart.module.css'

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalItems,
    totalPrice,
  } = useCart()
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  function closeCheckout() {
    setCheckoutOpen(false)
    setOrderPlaced(false)
  }

  // Quantity cannot reach zero, so only removing the last row can empty the cart.
  function handleRemove(productId) {
    if (cartItems.length === 1) closeCheckout()
    removeFromCart(productId)
  }

  return (
    <section>
      <h1>Cart</h1>

      {cartItems.length === 0 && (
        <>
          <p>Your cart is empty.</p>
          <Link className={styles.continue} to="/">
            Continue shopping
          </Link>
        </>
      )}

      {cartItems.length > 0 && (
        <>
          <ul className={styles.list}>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onDecrease={decreaseQuantity}
                onIncrease={increaseQuantity}
                onRemove={handleRemove}
              />
            ))}
          </ul>

          <div className={styles.summary}>
            <p>Total items: {totalItems}</p>
            <p className={styles.total}>Total: ${totalPrice.toFixed(2)}</p>
          </div>

          {!checkoutOpen && (
            <button
              type="button"
              className={styles.checkoutButton}
              onClick={() => setCheckoutOpen(true)}
            >
              Continue to checkout
            </button>
          )}

          {checkoutOpen && (
            <CheckoutPanel
              totalItems={totalItems}
              totalPrice={totalPrice}
              orderPlaced={orderPlaced}
              onPlaceOrder={() => setOrderPlaced(true)}
              onBack={closeCheckout}
            />
          )}
        </>
      )}
    </section>
  )
}

export default Cart
