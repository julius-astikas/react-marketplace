import styles from './Cart.module.css'

function CartItem({ item, onDecrease, onIncrease, onRemove }) {
  const lineTotal = item.price * item.quantity

  return (
    <li className={styles.item}>
      <img
        className={styles.thumb}
        src={item.thumbnail}
        alt={item.title}
      />

      <div className={styles.body}>
        <h2 className={styles.title}>{item.title}</h2>
        <p className={styles.unitPrice}>${item.price.toFixed(2)} each</p>
      </div>

      <div className={styles.quantity}>
        <button
          type="button"
          onClick={() => onDecrease(item.id)}
          disabled={item.quantity <= 1}
          aria-label={`Decrease quantity of ${item.title}`}
        >
          −
        </button>
        <span aria-live="polite">{item.quantity}</span>
        <button
          type="button"
          onClick={() => onIncrease(item.id)}
          aria-label={`Increase quantity of ${item.title}`}
        >
          +
        </button>
      </div>

      <p className={styles.subtotal}>Subtotal: ${lineTotal.toFixed(2)}</p>

      <button
        type="button"
        className={styles.remove}
        onClick={() => onRemove(item.id)}
        aria-label={`Remove ${item.title}`}
      >
        Remove
      </button>
    </li>
  )
}

export default CartItem
