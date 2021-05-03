import { useContext, useState } from 'react';
import useHttp, { RequestTypes } from '../../hooks/use-http';
import { CartContext } from '../../store';
import Modal from '../ui/modal';
import CartItem from './cart-item';
import classes from './cart.module.css';
import Checkout, { UserData } from './checkout';

interface CartProps {
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ onClose }) => {

  const [isCheckout, setIsCheckout] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const { items, getTotal, getNumberOfItems, addItem, removeItem, clearCart } = useContext(CartContext); 
  
  const [submitOrderResponse, error, loading, sendRequest] = useHttp<null>();

  const orderHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsCheckout(true);
  }

  const submitOrderHandler = async (userData: UserData) => {
    await sendRequest({
      url: 'http://localhost:3001/orders',
      requestType: RequestTypes.POST,
      body: {
        userData,
        items,
      }
    });
    setDidSubmit(true);
    clearCart();
    onClose();
  }

  const cartModalContent = (
    <>
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
      {isCheckout && <Checkout onCancel={onClose} onConfirm={submitOrderHandler} />}
      {!isCheckout && <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={onClose}>Close</button>
        {getNumberOfItems() > 0 && <button className={classes.button} onClick={orderHandler}>Order</button>}
      </div>}
    </>);

  const isSubmittingModalContent = <p>Sending your order</p>

  const submittedModalContent = <p>Thanks for your order!</p>

  const errorModalContent = <p>There was an error sending your order</p>

  return (
    <Modal onClose={onClose}>
      {!loading && !didSubmit && cartModalContent}
      {loading && isSubmittingModalContent}
      {!loading && didSubmit && !error && submittedModalContent}
      {!loading && error && errorModalContent}
    </Modal>
  );
}

export default Cart;