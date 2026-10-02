import ProductCard from '../../components/ProductCard/ProductCard'
import { useProducts } from '../../hooks/useProducts'
import Pagination from './Pagination'
import ProductFilters from './ProductFilters'
import styles from './Products.module.css'

function Products() {
  const {
    category,
    region,
    country,
    categories,
    countryOptions,
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
  } = useProducts()
  const showResults = !isPending && !isError

  return (
    <section>
      <h1>Products</h1>

      <ProductFilters
        category={category}
        region={region}
        country={country}
        categories={categories}
        countryOptions={countryOptions}
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
