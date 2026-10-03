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
    clearCart,
    totalItems,
    totalPrice,
  } = useCart()
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [completedOrder, setCompletedOrder] = useState(null)

  function closeCheckout() {
    setCheckoutOpen(false)
  }

  function placeDemoOrder() {
    setCompletedOrder({ totalItems, totalPrice })
    setCheckoutOpen(false)
    clearCart()
  }

  // Quantity cannot reach zero, so only removing the last row can empty the cart.
  function handleRemove(productId) {
    if (cartItems.length === 1) closeCheckout()
    removeFromCart(productId)
  }

  return (
    <section className={styles.page}>
      <h1>Cart</h1>
      <Link className={styles.continue} to="/">
        <span aria-hidden="true">←</span> Continue shopping
      </Link>

      {cartItems.length === 0 && completedOrder && (
        <div className={styles.success} role="status">
          <h2>Demo order created</h2>
          <p>Your demo order has been placed successfully.</p>
          <p>Total items: {completedOrder.totalItems}</p>
          <p className={styles.total}>
            Order total: ${completedOrder.totalPrice.toFixed(2)}
          </p>
          <p>No real payment was processed.</p>
          <p>Cart has been cleared.</p>
          <Link className={styles.continue} to="/">
            Continue shopping
          </Link>
        </div>
      )}

      {cartItems.length === 0 && !completedOrder && <p>Your cart is empty.</p>}

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
              onPlaceOrder={placeDemoOrder}
              onBack={closeCheckout}
            />
          )}
        </>
      )}
    </section>
  )
}

export default Cart
