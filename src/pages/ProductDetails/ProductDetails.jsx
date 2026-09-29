import { useParams } from 'react-router-dom'

function ProductDetails() {
  const { id } = useParams()

  return (
    <section>
      <h1>Product details</h1>
      <p>Product {id}</p>
    </section>
  )
}

export default ProductDetails
