import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
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
                      onClick={() => removeFromCart(item.id)}
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
        </>
      )}
    </section>
  )
}

export default Cart
