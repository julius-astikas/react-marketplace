import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
})

// List endpoints return { products, total, skip, limit }, not a bare array.
export async function getProducts({ limit, skip } = {}) {
  const { data } = await api.get('/products', {
    params: { limit, skip },
  })

  return data
}

export async function getProductById(id) {
  const { data } = await api.get(`/products/${id}`)
  return data
}

export async function searchProducts({ query, limit, skip } = {}) {
  const { data } = await api.get('/products/search', {
    params: { q: query, limit, skip },
  })

  return data
}

// Each category is { slug, name, url }, as returned by the API.
export async function getCategories() {
  const { data } = await api.get('/products/categories')
  return data
}

export async function getProductsByCategory({ categorySlug, limit, skip } = {}) {
  const { data } = await api.get(`/products/category/${categorySlug}`, {
    params: { limit, skip },
  })

  return data
}
