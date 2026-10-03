import styles from './Products.module.css'

const categoryShortcuts = [
  { slug: 'beauty', name: 'Beauty' },
  { slug: 'laptops', name: 'Laptops' },
  { slug: 'furniture', name: 'Furniture' },
  { slug: 'groceries', name: 'Groceries' },
  { slug: 'smartphones', name: 'Smartphones' },
  { slug: 'sports-accessories', name: 'Sports Accessories' },
]

function CategoryShortcuts({ category, onSelectCategory }) {
  return (
    <section className={styles.shortcuts} aria-labelledby="explore-categories">
      <h2 id="explore-categories" className={styles.shortcutsTitle}>
        Explore categories
      </h2>
      <ul className={styles.shortcutList}>
        {categoryShortcuts.map((item) => {
          const selected = category === item.slug

          return (
            <li key={item.slug}>
              <button
                type="button"
                className={selected ? styles.shortcutActive : styles.shortcut}
                aria-pressed={selected}
                onClick={() => onSelectCategory(item.slug)}
              >
                {item.name}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default CategoryShortcuts
