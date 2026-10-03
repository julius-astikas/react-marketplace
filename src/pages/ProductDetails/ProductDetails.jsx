import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../../api/products'
import { useCart } from '../../context/CartContext'
import { getMarketplaceMetadata } from '../../utils/marketplaceMetadata'
import ProductFacts from './ProductFacts'
import styles from './ProductDetails.module.css'

function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [addedForId, setAddedForId] = useState(null)
  const [selection, setSelection] = useState({ id: null, quantity: 1 })

  const productQuery = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    retry: (failureCount, error) =>
      error?.response?.status !== 404 && failureCount < 3,
  })

  const product = productQuery.data
  const hasProduct = product?.id != null
  const marketplace = hasProduct ? getMarketplaceMetadata(product.id) : null
  const imageSrc = product?.images?.[0] || product?.thumbnail
  const category =
    typeof product?.category === 'string'
      ? product.category.replaceAll('-', ' ')
      : ''
  const price = Number(product?.price)
  const stock = Number(product?.stock)
  const stockKnown = Number.isFinite(stock) && stock >= 0
  const outOfStock = stockKnown && stock === 0
  const selectedQuantity = selection.id === product?.id ? selection.quantity : 1
  const quantity = outOfStock
    ? 1
    : stockKnown
      ? Math.min(selectedQuantity, stock)
      : selectedQuantity
  const added = addedForId === product?.id

  function changeQuantity(next) {
    if (outOfStock) return
    const minimum = 1
    const capped = stockKnown ? Math.min(Math.max(minimum, next), stock) : Math.max(minimum, next)
    setSelection({ id: product.id, quantity: capped })
  }

  function handleAddToCart() {
    addToCart(product, quantity)
    setAddedForId(product.id)
  }

  return (
    <section>
      <Link className={styles.back} to="/">
        <span aria-hidden="true">←</span> Back to products
      </Link>

      {productQuery.isPending && <p>Loading product...</p>}

      {(productQuery.isError || (productQuery.isSuccess && !hasProduct)) && (
        <>
          <h1>Product details</h1>
          <p>Could not load product.</p>
        </>
      )}

      {hasProduct && marketplace && (
        <div className={styles.layout}>
          {imageSrc && (
            <div className={styles.imageWrap}>
              <img src={imageSrc} alt={product.title} />
            </div>
          )}

          <div className={styles.info}>
            <h1 className={styles.title}>{product.title}</h1>

            {Number.isFinite(price) && (
              <p className={styles.price}>${price.toFixed(2)}</p>
            )}

            {product.description && (
              <p className={styles.description}>{product.description}</p>
            )}

            <ProductFacts
              category={category}
              brand={product.brand}
              rating={product.rating}
              stock={product.stock}
              country={marketplace.country}
              region={marketplace.region}
            />

            <div className={styles.purchase}>
              <div className={styles.quantity}>
                <button
                  type="button"
                  onClick={() => changeQuantity(quantity - 1)}
                  disabled={outOfStock || quantity <= 1}
                  aria-label={`Decrease quantity of ${product.title}`}
                >
                  −
                </button>
                <span aria-live="polite">{quantity}</span>
                <button
                  type="button"
                  onClick={() => changeQuantity(quantity + 1)}
                  disabled={outOfStock || (stockKnown && quantity >= stock)}
                  aria-label={`Increase quantity of ${product.title}`}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className={styles.addToCart}
                onClick={handleAddToCart}
                disabled={outOfStock}
              >
                Add to cart
              </button>
            </div>
            {added && (
              <p className={styles.added} role="status">
                Added to cart
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductDetails
