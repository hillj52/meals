import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../store';
import CartIcon from '../cart/cart-icon';
import classes from './header-cart-button.module.css';

interface HeaderCartButtonProps {
  onClick: () => void;
}

const HeaderCartButton: React.FC<HeaderCartButtonProps> = ({ onClick }) => {
  const { getNumberOfItems } = useContext(CartContext);
  const [animateBtn, setAnimateBtn] = useState(false);

  const btnClasses = `${classes.button} ${animateBtn ? classes.bump : ''}`

  useEffect(() => {
    if (getNumberOfItems() === 0) {
      return;
    }
    setAnimateBtn(true);
    const timer = setTimeout(() => {
      setAnimateBtn(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    }
  }, [getNumberOfItems])

  return (
    <button className={btnClasses} onClick={onClick}>
      <span className={classes.icon}><CartIcon /></span>
      <span>Your Cart</span>
      <span className={classes.badge}>{getNumberOfItems()}</span>
    </button>
  );
}

export default HeaderCartButton;