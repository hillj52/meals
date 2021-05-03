import classes from './cart-item.module.css';

interface CartItemProps {
  price: number;
  name: string;
  amount: number;
  onRemove: () => void;
  onAdd: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ name, price, amount, onRemove, onAdd }) => (
  <li className={classes['cart-item']}>
    <div>
      <h2>{name}</h2>
      <div className={classes.summary}>
        <span className={classes.price}>{price.toFixed(2)}</span>
        <span className={classes.amount}>x {amount}</span>
      </div>
    </div>
    <div className={classes.actions}>
      <button onClick={onRemove}>−</button>
      <button onClick={onAdd}>+</button>
    </div>
  </li>
);

export default CartItem;
