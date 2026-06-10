import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Badge from './components/Badge/Badge'
import ProductCard from './components/ProductCard/ProductCard'

type CartItem = { name: string; price: number }

type Product = {
  id: number
  name: string
  price: number
  image: string
  inStock: boolean
}

const products: Product[] = [
  {
    id: 1,
    name: 'Casque Sony WH-1000XM5',
    price: 349.99,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    inStock: true,
  },
  {
    id: 2,
    name: 'iPhone 15 Pro',
    price: 1229.0,
    image:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
    inStock: false,
  },
  {
    id: 3,
    name: 'MacBook Air M3',
    price: 1299.0,
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    inStock: true,
  },
]

function App() {
  const [cart, setCart] = useState<CartItem[]>([])

  const handleAddToCart = (item: CartItem) => {
    setCart((c) => [...c, item])
    alert(`Ajouté au panier : ${item.name} (${item.price.toFixed(2)} €)`)
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Formateur</h1>
          <p>
            {new Date().toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p>Bienvenue dans ma première app React !</p>
          <Badge text="React" color="#61DAFB" />
          <Badge text="Vite" color="#16d837" />
        </div>
        <h1>🛒 Notre catalogue</h1>

        <p className="cart-count">
          Panier : {cart.length} article{cart.length > 1 ? 's' : ''}
        </p>

        <div className="grid">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              name={p.name}
              price={p.price}
              image={p.image}
              inStock={p.inStock}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default App
