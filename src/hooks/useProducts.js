import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  getCategories,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from '../api/products'
import {
  filterByLocation,
  getCountriesForRegion,
  withMarketplaceMetadata,
} from '../utils/marketplaceMetadata'

const PAGE_SIZE = 12

export function useProductFilters() {
  const [category, setCategory] = useState('')
  const [region, setRegion] = useState('')
  const [country, setCountry] = useState('')

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  return {
    category,
    setCategory,
    region,
    setRegion,
    country,
    setCountry,
    categories: categoriesQuery.data ?? [],
    countryOptions: getCountriesForRegion(region),
  }
}

export function useProductCatalog(filters) {
  const {
    category,
    setCategory,
    region,
    setRegion,
    country,
    setCountry,
  } = filters
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('q')?.trim() ?? ''
  const [currentPage, setCurrentPage] = useState(1)
  const limit = PAGE_SIZE
  const skip = (currentPage - 1) * limit
  const searchActive = Boolean(searchTerm)
  const locationActive = Boolean(region || country)

  const productsQuery = useQuery({
    queryKey: searchActive
      ? ['products', { query: searchTerm, limit: 0 }]
      : locationActive
        ? ['products', { category, limit: 0 }]
        : ['products', { category, limit, skip }],
    queryFn: () => {
      if (searchActive) {
        // DummyJSON search cannot apply our region/country metadata.
        // limit 0 loads every match so category, location, and pages are applied locally.
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

  const baseProducts = productsQuery.data?.products ?? []
  const searchedProducts = searchActive
    ? baseProducts.filter((product) => !category || product.category === category)
    : baseProducts
  const matchedProducts =
    searchActive || locationActive
      ? filterByLocation(searchedProducts, { region, country })
      : baseProducts.map(withMarketplaceMetadata)
  // The full match set is already loaded, so these results are paged locally.
  const usesLocalPaging = searchActive || locationActive
  const pageProducts = usesLocalPaging
    ? matchedProducts.slice(skip, skip + limit)
    : matchedProducts
  const resultCount = usesLocalPaging
    ? matchedProducts.length
    : (productsQuery.data?.total ?? 0)

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

  return {
    handleCategoryChange,
    handleRegionChange,
    handleCountryChange,
    isPending: productsQuery.isPending,
    isError: productsQuery.isError,
    pageProducts,
    activePage: currentPage,
    pageCount: Math.max(1, Math.ceil(resultCount / limit)),
    goToPreviousPage: () => setCurrentPage((page) => page - 1),
    goToNextPage: () => setCurrentPage((page) => page + 1),
  }
}
