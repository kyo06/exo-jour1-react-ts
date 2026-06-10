import type { Product } from '../types/product'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const priceFormatted = product.price.toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  })

  return (
    <div style={{
      border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '100%', height: 160, objectFit: 'cover' }}
      />
      <div style={{ padding: 12, flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h3 style={{ margin: 0, fontSize: 15 }}>{product.name}</h3>
        <span style={{ color: '#888', fontSize: 13 }}>{product.category}</span>
        <strong style={{ marginTop: 'auto' }}>{priceFormatted}</strong>

        {product.stock === 0 ? (
          <span style={{
            background: '#fee2e2', color: '#dc2626',
            padding: '4px 8px', borderRadius: 4, fontSize: 13, textAlign: 'center',
          }}>
            Rupture de stock
          </span>
        ) : (
          <button
            onClick={() => onAddToCart?.(product)}
            style={{
              background: '#6366f1', color: '#fff', border: 'none',
              padding: '8px', borderRadius: 6, cursor: 'pointer', marginTop: 8,
            }}
          >
            Ajouter au panier
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductCard
