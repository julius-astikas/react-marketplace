import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../../api/products'

function Products() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['products', { limit: 30, skip: 0 }],
    queryFn: () => getProducts({ limit: 30, skip: 0 }),
  })

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Could not load products.</p>
  }

  return (
    <section>
      <h1>Products</h1>
      <p>
        Loaded {data.products.length} of {data.total} products.
      </p>
    </section>
  )
}

export default Products
