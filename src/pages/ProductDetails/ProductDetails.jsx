import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../../api/products'
import { useCart } from '../../context/CartContext'
import { getMarketplaceMetadata } from '../../utils/marketplaceMetadata'
import styles from './ProductDetails.module.css'

function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [addedForId, setAddedForId] = useState(null)

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
  const showBrand = typeof product?.brand === 'string' && product.brand.trim() !== ''
  const added = addedForId === product?.id

  function handleAddToCart() {
    addToCart(product)
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
                  <dd>{product.brand}</dd>
                </div>
              )}

              {product.rating != null && (
                <div className={styles.fact}>
                  <dt>Rating</dt>
                  <dd>{product.rating}</dd>
                </div>
              )}

              {product.stock != null && (
                <div className={styles.fact}>
                  <dt>Stock</dt>
                  <dd>{product.stock}</dd>
                </div>
              )}

              <div className={styles.fact}>
                <dt>Location</dt>
                <dd>
                  {marketplace.country} · {marketplace.region}
                </dd>
              </div>
            </dl>

            <button
              type="button"
              className={styles.addToCart}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              Add to cart
            </button>
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
