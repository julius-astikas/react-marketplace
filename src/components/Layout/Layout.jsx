import { NavLink, Outlet } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useTheme } from '../../context/ThemeContext'
import SearchBar from '../SearchBar/SearchBar'
import styles from './Layout.module.css'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M4.8 4.8l1.6 1.6M17.6 17.6l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.8 19.2l1.6-1.6M17.6 6.4l1.6-1.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M15.5 3.2a8.2 8.2 0 1 0 5.3 12.8A7 7 0 0 1 15.5 3.2z"
      />
    </svg>
  )
}

function Layout() {
  const { totalItems } = useCart()

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.brand}>Marketplace</p>
        <SearchBar />
        <div className={styles.actions}>
          <nav className={styles.nav}>
            <NavLink to="/" end>
              Products
            </NavLink>
            <NavLink to="/cart">Cart ({totalItems})</NavLink>
          </nav>
          <ThemeToggle />
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
