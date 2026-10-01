import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './SearchBar.module.css'

function SearchBar() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('q')?.trim() ?? ''
  const [value, setValue] = useState(searchTerm)
  const [shownTerm, setShownTerm] = useState(searchTerm)

  // Keep the field in sync with ?q= before paint, including when Products clears it.
  if (searchTerm !== shownTerm) {
    setShownTerm(searchTerm)
    setValue(searchTerm)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = value.trim()
    const next = new URLSearchParams()

    if (trimmed) {
      next.set('q', trimmed)
    }

    setValue(trimmed)
    navigate({ pathname: '/', search: next.toString() })
  }

  return (
    <form className={styles.form} role="search" onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="product-search">
        Search products
      </label>
      <input
        id="product-search"
        className={styles.input}
        type="search"
        value={value}
        placeholder="Search products..."
        onChange={(event) => setValue(event.target.value)}
      />
      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  )
}

export default SearchBar
