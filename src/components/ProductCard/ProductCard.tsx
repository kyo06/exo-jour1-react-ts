import styles from './ProductCard.module.css'

interface CartItem {
  name: string
  price: number
}

interface ProductCardProps {
  name: string
  price: number
  image: string
  inStock: boolean
  onAddToCart?: (item: CartItem) => void
}

export default function ProductCard({ name, price, image, inStock, onAddToCart }: ProductCardProps) {
  const handleAddToCart = () => {
    if (!inStock) return
    onAddToCart?.({ name, price })
  }

  return (
    <div className={styles.card}>
      {!inStock && <span className={styles.badge}>Rupture de stock</span>}

      <img src={image} alt={name} className={styles.image} />

      <div className={styles.body}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.price}>{price.toFixed(2)} €</p>
      </div>

      <button className={styles.button} onClick={handleAddToCart} disabled={!inStock}>
        {inStock ? 'Ajouter au panier' : 'Indisponible'}
      </button>
    </div>
  )
}
