import { useState } from 'react'
import './App.css'
// import logo from './assets/shoe-logo.png'

function App() {
  const [cart, setCart] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [modalImage, setModalImage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const shoes = {
    running: [
      { id: 1, name: "Nike Air Max", price: 129.99, image: "/src/assets/images/s.jpg", category: "running" },
      { id: 2, name: "Adidas Ultraboost", price: 159.99, image: "./src/assets/images/s1.jpg", category: "running" },
      // { id: 5, name: "Asics Gel-Kayano", price: 139.99, image: "https://via.placeholder.com/150", category: "running" },
      // { id: 6, name: "Brooks Ghost", price: 119.99, image: "https://via.placeholder.com/150", category: "running" },
    ],
    casual: [
      { id: 3, name: "Puma RS-X", price: 89.99, image: "./src/assets/images/s2.jpg", category: "casual" },
      { id: 4, name: "New Balance 574", price: 79.99, image: "./src/assets/images/s3.jpg", category: "casual" },
      // { id: 7, name: "Vans Old Skool", price: 69.99, image: "https://via.placeholder.com/150", category: "casual" },
      // { id: 8, name: "Converse Chuck Taylor", price: 59.99, image: "https://via.placeholder.com/150", category: "casual" },
    ],
    formal: [
      { id: 9, name: "Oxford Shoes", price: 149.99, image: "./src/assets/images/s4.jpg", category: "formal" },
      { id: 10, name: "Loafers", price: 129.99, image: "./src/assets/images/s5.jpg", category: "formal" },
    ],
    sports: [
      { id: 11, name: "Basketball Shoes", price: 139.99, image: "./src/assets/images/s6.jpg", category: "sports" },
      { id: 12, name: "Soccer Cleats", price: 119.99, image: "./src/assets/images/s7.jpg", category: "sports" },
    ]
  }

  const addToCart = (shoe) => {
    const existingItem = cart.find(item => item.id === shoe.id)
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === shoe.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...shoe, quantity: 1 }])
    }
    setModalImage(shoe.image)
    setIsModalOpen(true)
  }

  const removeFromCart = (shoeId) => {
    setCart(cart.map(item =>
      item.id === shoeId && item.quantity > 0
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0))
  }

  const cartTotal = cart.reduce((total, item) => 
    total + (item.price * item.quantity), 0
  )

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-brand">
          <img src="./src/assets/logo/l.jpg" alt="Shoe Store Logo" className="nav-logo" />
          <span></span>
        </div>
        <ul className="nav-menu">
          <li>
            <button 
              className={activeCategory === 'all' ? 'active' : ''} 
              onClick={() => setActiveCategory('all')}
            >
              Home
            </button>
          </li>
          <li>
            <button 
              className={activeCategory === 'running' ? 'active' : ''} 
              onClick={() => setActiveCategory('running')}
            >
              Categories
            </button>
          </li>
          <li>
            <button 
              className={activeCategory === 'casual' ? 'active' : ''} 
              onClick={() => setActiveCategory('casual')}
            >
              About Us
            </button>
          </li>
        </ul>
      </nav>

      <div className="app-container">
        <div className="shoe-list">
          <h2>Available Shoes</h2>

          {/* Render Running Shoes */}
          {activeCategory === 'all' || activeCategory === 'running' ? (
            <div className="category">
              <h3>Running Shoes</h3>
              <div className="shoes-grid">
                {shoes.running.map(shoe => (
                  <div key={shoe.id} className="shoe-card">
                    <img src={shoe.image} alt={shoe.name} />
                    <h3>{shoe.name}</h3>
                    <p>${shoe.price}</p>
                    <button onClick={() => addToCart(shoe)}>Add to Cart</button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Render Casual Shoes */}
          {activeCategory === 'all' || activeCategory === 'casual' ? (
            <div className="category">
              <h3>Casual Shoes</h3>
              <div className="shoes-grid">
                {shoes.casual.map(shoe => (
                  <div key={shoe.id} className="shoe-card">
                    <img src={shoe.image} alt={shoe.name} />
                    <h3>{shoe.name}</h3>
                    <p>${shoe.price}</p>
                    <button onClick={() => addToCart(shoe)}>Add to Cart</button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Render Formal Shoes */}
          {activeCategory === 'all' || activeCategory === 'formal' ? (
            <div className="category">
              <h3>Formal Shoes</h3>
              <div className="shoes-grid">
                {shoes.formal.map(shoe => (
                  <div key={shoe.id} className="shoe-card">
                    <img src={shoe.image} alt={shoe.name} />
                    <h3>{shoe.name}</h3>
                    <p>${shoe.price}</p>
                    <button onClick={() => addToCart(shoe)}>Add to Cart</button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Render Sports Shoes */}
          {activeCategory === 'all' || activeCategory === 'sports' ? (
            <div className="category">
              <h3>Sports Shoes</h3>
              <div className="shoes-grid">
                {shoes.sports.map(shoe => (
                  <div key={shoe.id} className="shoe-card">
                    <img src={shoe.image} alt={shoe.name} />
                    <h3>{shoe.name}</h3>
                    <p>${shoe.price}</p>
                    <button onClick={() => addToCart(shoe)}>Add to Cart</button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="cart">
          <h2>Shopping Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
              <div className="cart-total">
                <h3>Total: ${cartTotal.toFixed(2)}</h3>
              </div>
            </>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="Shoe" className="modal-image" />
            <button className="close-modal" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  )
}

export default App
