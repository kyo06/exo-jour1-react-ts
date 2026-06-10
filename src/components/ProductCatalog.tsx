import { useState, useMemo } from 'react'
import type { Product } from '../types/product'
import CategoryFilter from './CategoryFilter'
import ProductGrid from './ProductGrid'

interface ProductCatalogProps {
  products: Product[]
}

const ProductCatalog = ({ products }: ProductCatalogProps) => {
  const [selectedCategory, setSelectedCategory] = useState('Tous')

  const categories = useMemo(() => [...new Set(products.map(p => p.category))], [products])

  const filtered = selectedCategory === 'Tous'
    ? products
    : products.filter(p => p.category === selectedCategory)

  return (
    <div>
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <p style={{ color: '#666' }}>{filtered.length} produit(s)</p>
      <ProductGrid products={filtered} />
    </div>
  )
}

export default ProductCatalog
