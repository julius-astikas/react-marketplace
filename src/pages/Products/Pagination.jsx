import styles from './Products.module.css'

function Pagination({ page, pageCount, onPrevious, onNext }) {
  return (
    <nav className={styles.pagination} aria-label="Product pages">
      <button type="button" onClick={onPrevious} disabled={page <= 1}>
        Previous
      </button>
      <p>
        Page {page} of {pageCount}
      </p>
      <button type="button" onClick={onNext} disabled={page >= pageCount}>
        Next
      </button>
    </nav>
  )
}

export default Pagination
