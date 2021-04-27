import { useContext } from 'react';
import { CartContext } from '../../store';
import Modal from '../ui/modal';
import CartItem from './cart-item';
import classes from './cart.module.css';

interface CartProps {
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
  const { items, getTotal, getNumberOfItems, addItem, removeItem } = useContext(CartContext); 
  return (
    <Modal onClose={onClose}>
      <ul className={classes['cart-items']}>
        {items.map(item => <CartItem 
          key={item.id} 
          { ...item } 
          onAdd={() => addItem({ ...item, amount: 1 })} 
          onRemove={() => removeItem(item.id)} 
        />)}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$${getTotal().toFixed(2)}`}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={onClose}>Close</button>
        {getNumberOfItems() > 0 && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
}

export default Cart;