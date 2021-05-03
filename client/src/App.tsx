import { useState } from 'react';
import Cart from './components/cart/cart';
import Header from './components/layout/header';
import Meals from './components/meals/meals';
import CartProvider from './store';

const App: React.FC = () => {
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(true);
  }

  const hideCartHandler = () => {
    setShowCart(false);
  }

  return (
    <CartProvider>
      <main>
        <Header onShowCart={showCartHandler} />
        <main>
          <Meals />
        </main>
        {showCart && <Cart onClose={hideCartHandler} />}
      </main>
    </CartProvider>
  )
}

export default App;
