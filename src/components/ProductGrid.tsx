import type { Product } from '../types/product'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
  onAddToCart?: (product: Product) => void
}

const ProductGrid = ({ products, onAddToCart }: ProductGridProps) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 16,
  }}>
    {products.map(p => (
      <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
    ))}
  </div>
)

export default ProductGrid
