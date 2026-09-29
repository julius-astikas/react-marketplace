import { Link } from 'react-router-dom'
import styles from './ProductCard.module.css'

function ProductCard({ product }) {
  const category = product.category.replaceAll('-', ' ')

  return (
    <Link className={styles.card} to={`/products/${product.id}`}>
      <div className={styles.imageWrap}>
        <img src={product.thumbnail} alt={product.title} />
      </div>
      <div className={styles.body}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <p className={styles.category}>{category}</p>
        <p className={styles.location}>
          {product.marketplace.country} · {product.marketplace.region}
        </p>
      </div>
    </Link>
  )
}

export default ProductCard
