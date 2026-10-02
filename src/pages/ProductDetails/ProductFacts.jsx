import styles from './ProductDetails.module.css'

function ProductFacts({ category, brand, rating, stock, country, region }) {
  const showBrand = typeof brand === 'string' && brand.trim() !== ''

  return (
    <dl className={styles.facts}>
      {category && (
        <div className={styles.fact}>
          <dt>Category</dt>
          <dd className={styles.category}>{category}</dd>
        </div>
      )}

      {showBrand && (
        <div className={styles.fact}>
          <dt>Brand</dt>
          <dd>{brand}</dd>
        </div>
      )}

      {rating != null && (
        <div className={styles.fact}>
          <dt>Rating</dt>
          <dd>{rating}</dd>
        </div>
      )}

      {stock != null && (
        <div className={styles.fact}>
          <dt>Stock</dt>
          <dd>{stock}</dd>
        </div>
      )}

      <div className={styles.fact}>
        <dt>Location</dt>
        <dd>
          {country} · {region}
        </dd>
      </div>
    </dl>
  )
}

export default ProductFacts
