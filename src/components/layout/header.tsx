import classes from './header.module.css';
import mealsImg from '../../assets/meals.jpg'
import HeaderCartButton from './header-cart-button';

interface HeaderProps {
  onShowCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowCart }) => (
  <>
    <header className={classes.header}>
      <h1>Meals</h1>
      <HeaderCartButton onClick={onShowCart}/>
    </header>
    <div className={classes['main-image']}>
      <img src={mealsImg} alt="Meals"/>
    </div>
  </>
);

export default Header;