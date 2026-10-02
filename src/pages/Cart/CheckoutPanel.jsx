import styles from './Cart.module.css'

const purchaseSteps = [
  'Payment reserved',
  'Seller ships the order',
  'Buyer confirms delivery',
  'Payment released',
]

function CheckoutPanel({ totalItems, totalPrice, orderPlaced, onPlaceOrder, onBack }) {
  return (
    <section className={styles.checkout} aria-labelledby="protected-purchase">
      <h2 id="protected-purchase" className={styles.checkoutTitle}>
        Protected purchase
      </h2>
      <p className={styles.disclaimer}>Demo only — no real payment is processed.</p>

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
        <button type="button" onClick={onPlaceOrder}>
          Place demo order
        </button>
        <button type="button" onClick={onBack}>
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
  )
}

export default CheckoutPanel
