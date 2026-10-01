import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  getCategories,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from '../../api/products'
import ProductCard from '../../components/ProductCard/ProductCard'
import {
  filterByLocation,
  getCountriesForRegion,
  marketplaceRegions,
  withMarketplaceMetadata,
} from '../../utils/marketplaceMetadata'
import styles from './Products.module.css'

const PAGE_SIZE = 12

function Products() {
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('q')?.trim() ?? ''
  const [currentPage, setCurrentPage] = useState(1)
  const [category, setCategory] = useState('')
  const [region, setRegion] = useState('')
  const [country, setCountry] = useState('')
  const [pageSearchTerm, setPageSearchTerm] = useState(searchTerm)

  // Reset before paint so a new search does not request or show a later page.
  const searchChanged = searchTerm !== pageSearchTerm
  if (searchChanged) {
    setPageSearchTerm(searchTerm)
    setCurrentPage(1)
  }

  const limit = PAGE_SIZE
  const activePage = searchChanged ? 1 : currentPage
  const skip = (activePage - 1) * limit
  const searchActive = Boolean(searchTerm)
  const locationActive = Boolean(region || country)

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const productsQuery = useQuery({
    queryKey: searchActive
      ? ['products', { query: searchTerm, limit: 0 }]
      : locationActive
        ? ['products', { category, limit: 0 }]
        : ['products', { category, limit, skip }],
    queryFn: () => {
      if (searchActive) {
        // DummyJSON search cannot apply our region/country metadata.
        // Load every match, then filter and paginate locally.
        return searchProducts({ query: searchTerm, limit: 0 })
      }

      // Location is not a DummyJSON field. Load the full base list, then filter locally.
      if (locationActive) {
        return category
          ? getProductsByCategory({ categorySlug: category, limit: 0 })
          : getProducts({ limit: 0 })
      }

      return category
        ? getProductsByCategory({ categorySlug: category, limit, skip })
        : getProducts({ limit, skip })
    },
  })

  const categories = categoriesQuery.data ?? []
  const baseProducts = productsQuery.data?.products ?? []
  const searchedProducts = searchActive
    ? baseProducts.filter((product) => !category || product.category === category)
    : baseProducts
  const matchedProducts = searchActive || locationActive
    ? filterByLocation(searchedProducts, { region, country })
    : baseProducts.map(withMarketplaceMetadata)
  const usesLocalPaging = searchActive || locationActive
  const pageProducts = usesLocalPaging
    ? matchedProducts.slice(skip, skip + limit)
    : matchedProducts
  const resultCount = usesLocalPaging
    ? matchedProducts.length
    : (productsQuery.data?.total ?? 0)
  const pageCount = Math.max(1, Math.ceil(resultCount / limit))
  const countryOptions = getCountriesForRegion(region)

  function handleCategoryChange(event) {
    setCategory(event.target.value)
    setCurrentPage(1)
  }

  function handleRegionChange(event) {
    setRegion(event.target.value)
    setCountry('')
    setCurrentPage(1)
  }

  function handleCountryChange(event) {
    setCountry(event.target.value)
    setCurrentPage(1)
  }

  return (
    <section>
      <h1>Products</h1>

      <div className={styles.filters}>
        <label className={styles.filter}>
          Category
          <select value={category} onChange={handleCategoryChange}>
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.filter}>
          Region
          <select value={region} onChange={handleRegionChange}>
            <option value="">All regions</option>
            {marketplaceRegions.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.filter}>
          Country
          <select
            value={country}
            onChange={handleCountryChange}
            disabled={!region}
          >
            <option value="">All countries</option>
            {countryOptions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {productsQuery.isPending && <p>Loading...</p>}
      {productsQuery.isError && <p>Could not load products.</p>}

      {!productsQuery.isPending && !productsQuery.isError && pageProducts.length === 0 && (
        <p>No products found.</p>
      )}

      {!productsQuery.isPending && !productsQuery.isError && pageProducts.length > 0 && (
        <ul className={styles.grid}>
          {pageProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}

      {!productsQuery.isPending && !productsQuery.isError && pageProducts.length > 0 && (
        <nav className={styles.pagination} aria-label="Product pages">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => page - 1)}
            disabled={activePage <= 1}
          >
            Previous
          </button>
          <p>
            Page {activePage} of {pageCount}
          </p>
          <button
            type="button"
            onClick={() => setCurrentPage((page) => page + 1)}
            disabled={activePage >= pageCount}
          >
            Next
          </button>
        </nav>
      )}
    </section>
  )
}

export default Products
