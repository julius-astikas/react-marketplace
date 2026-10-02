import { createContext, useContext, useLayoutEffect, useState } from 'react'

const STORAGE_KEY = 'marketplace-theme'

const ThemeContext = createContext(null)

// Only light and dark are valid. Missing or invalid storage stays light.
function readStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'dark' || stored === 'light' ? stored : 'light'
  } catch {
    return 'light'
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readStoredTheme)

  // Apply the theme before paint, then persist it.
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  function toggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react/only-export-components -- paired with ThemeProvider
export function useTheme() {
  const theme = useContext(ThemeContext)

  if (!theme) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return theme
}
