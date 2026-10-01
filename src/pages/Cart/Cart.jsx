import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import styles from './Cart.module.css'

const purchaseSteps = [
  'Payment reserved',
  'Seller ships the order',
  'Buyer confirms delivery',
  'Payment released',
]

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
            {cartItems.map((item) => {
              const lineTotal = item.price * item.quantity

              return (
                <li key={item.id} className={styles.item}>
                  {item.thumbnail && (
                    <img
                      className={styles.thumb}
                      src={item.thumbnail}
                      alt={item.title}
                    />
                  )}

                  <div className={styles.body}>
                    <h2 className={styles.title}>{item.title}</h2>
                    <p className={styles.unitPrice}>${item.price.toFixed(2)} each</p>

                    <div className={styles.quantity}>
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity <= 1}
                        aria-label={`Decrease quantity of ${item.title}`}
                      >
                        −
                      </button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        aria-label={`Increase quantity of ${item.title}`}
                      >
                        +
                      </button>
                    </div>

                    <p className={styles.subtotal}>
                      Subtotal: ${lineTotal.toFixed(2)}
                    </p>

                    <button
                      type="button"
                      className={styles.remove}
                      onClick={() => handleRemove(item.id)}
                      aria-label={`Remove ${item.title}`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              )
            })}
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
            <section className={styles.checkout} aria-labelledby="protected-purchase">
              <h2 id="protected-purchase" className={styles.checkoutTitle}>
                Protected purchase
              </h2>
              <p className={styles.disclaimer}>
                Demo only — no real payment is processed.
              </p>

              <ol className={styles.steps}>
                {purchaseSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>

              <div className={styles.orderSummary}>
                <p>Total items: {totalItems}</p>
                <p className={styles.total}>Order total: ${totalPrice.toFixed(2)}</p>
              </div>

              <div className={styles.checkoutActions}>
                <button type="button" onClick={() => setOrderPlaced(true)}>
                  Place demo order
                </button>
                <button type="button" onClick={closeCheckout}>
                  Back to cart
                </button>
              </div>

              {orderPlaced && (
                <div className={styles.success} role="status">
                  <p>Demo order created.</p>
                  <p>No real payment was processed.</p>
                </div>
              )}
            </section>
          )}
        </>
      )}
    </section>
  )
}

export default Cart
