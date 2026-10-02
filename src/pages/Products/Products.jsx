import { useSearchParams } from 'react-router-dom'
import ProductCard from '../../components/ProductCard/ProductCard'
import { useProductCatalog, useProductFilters } from '../../hooks/useProducts'
import Pagination from './Pagination'
import ProductFilters from './ProductFilters'
import styles from './Products.module.css'

function Products() {
  const filters = useProductFilters()
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('q')?.trim() ?? ''

  // A new ?q= remounts the listing, so its page state starts at 1.
  return <ProductListing key={searchTerm} filters={filters} />
}

function ProductListing({ filters }) {
  const {
    handleCategoryChange,
    handleRegionChange,
    handleCountryChange,
    isPending,
    isError,
    pageProducts,
    activePage,
    pageCount,
    goToPreviousPage,
    goToNextPage,
  } = useProductCatalog(filters)
  const showResults = !isPending && !isError

  return (
    <section>
      <h1>Products</h1>

      <ProductFilters
        category={filters.category}
        region={filters.region}
        country={filters.country}
        categories={filters.categories}
        countryOptions={filters.countryOptions}
        onCategoryChange={handleCategoryChange}
        onRegionChange={handleRegionChange}
        onCountryChange={handleCountryChange}
      />

      {isPending && <p>Loading...</p>}
      {isError && <p>Could not load products.</p>}

      {showResults && pageProducts.length === 0 && <p>No products found.</p>}

      {showResults && pageProducts.length > 0 && (
        <ul className={styles.grid}>
          {pageProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}

      {showResults && pageProducts.length > 0 && (
        <Pagination
          page={activePage}
          pageCount={pageCount}
          onPrevious={goToPreviousPage}
          onNext={goToNextPage}
        />
      )}
    </section>
  )
}

export default Products
