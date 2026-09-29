import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getProducts } from '../../api/products'
import ProductCard from '../../components/ProductCard/ProductCard'
import styles from './Products.module.css'

const PAGE_SIZE = 12

function Products() {
  const [currentPage, setCurrentPage] = useState(1)
  const limit = PAGE_SIZE
  const skip = (currentPage - 1) * limit

  const { data, isPending, isError } = useQuery({
    queryKey: ['products', { limit, skip }],
    queryFn: () => getProducts({ limit, skip }),
  })

  const products = data?.products ?? []
  const pageCount = Math.max(1, Math.ceil((data?.total ?? 0) / limit))

  return (
    <section>
      <h1>Products</h1>

      {isPending && <p>Loading...</p>}
      {isError && <p>Could not load products.</p>}

      {!isPending && !isError && products.length === 0 && (
        <p>No products found.</p>
      )}

      {!isPending && !isError && products.length > 0 && (
        <ul className={styles.grid}>
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}

      {!isPending && !isError && (
        <nav className={styles.pagination} aria-label="Product pages">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => page - 1)}
            disabled={currentPage <= 1}
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {pageCount}
          </p>
          <button
            type="button"
            onClick={() => setCurrentPage((page) => page + 1)}
            disabled={currentPage >= pageCount}
          >
            Next
          </button>
        </nav>
      )}
    </section>
  )
}

export default Products
