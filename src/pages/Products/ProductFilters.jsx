import { marketplaceRegions } from '../../utils/marketplaceMetadata'
import styles from './Products.module.css'

function ProductFilters({
  category,
  region,
  country,
  categories,
  countryOptions,
  onCategoryChange,
  onRegionChange,
  onCountryChange,
}) {
  return (
    <div className={styles.filters}>
      <label className={styles.filter}>
        Category
        <select value={category} onChange={onCategoryChange}>
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
        <select value={region} onChange={onRegionChange}>
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
        <select value={country} onChange={onCountryChange} disabled={!region}>
          <option value="">All countries</option>
          {countryOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default ProductFilters
