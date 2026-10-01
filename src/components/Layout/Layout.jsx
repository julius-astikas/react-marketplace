import { NavLink, Outlet } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import styles from './Layout.module.css'

function Layout() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.brand}>Marketplace</p>
        <SearchBar />
        <nav className={styles.nav}>
          <NavLink to="/" end>
            Products
          </NavLink>
          <NavLink to="/cart">Cart</NavLink>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
