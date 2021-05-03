import useInput from '../../hooks/use-input';
import classes from './checkout.module.css';

export interface UserData {
  name: string;
  street: string;
  city: string;
  postal: string;
}

interface CheckoutProps {
  onCancel: () => void;
  onConfirm: (userData: UserData) => Promise<void>;
}

const Checkout: React.FC<CheckoutProps> = ({ onCancel, onConfirm }) => {

  const [
    name, 
    nameIsValid,
    nameError, 
    nameChangeHandler, 
    nameBlurHandler, 
  ] = useInput((name) => name.trim() !== '');

  const [
    street, 
    streetIsValid,
    streetError, 
    streetChangeHandler, 
    streetBlurHandler, 
  ] = useInput((street) => street.trim() !== '');

  const [
    city, 
    cityIsValid,
    cityError, 
    cityChangeHandler, 
    cityBlurHandler, 
  ] = useInput((city) => city.trim() !== '');

  const [
    postal, 
    postalIsValid,
    postalError, 
    postalChangeHandler, 
    postalBlurHandler, 
  ] = useInput((postal) => postal.trim().length === 5 && !isNaN(+postal));

  const confirmHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    nameBlurHandler();
    streetBlurHandler();
    cityBlurHandler();
    postalBlurHandler();
    if (!nameIsValid || !streetIsValid || !cityIsValid || !postalIsValid) {
      return;
    }
    onConfirm({ name, street, city, postal });
  }

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${nameError ? classes.invalid : ''}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" value={name} onChange={nameChangeHandler} onBlur={nameBlurHandler} />
        {nameError && <p>Please enter a valid name!</p>}
      </div>
      <div className={`${classes.control} ${streetError ? classes.invalid : ''}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" value={street} onChange={streetChangeHandler} onBlur={streetBlurHandler} />
        {streetError && <p>Please enter a valid street!</p>}
      </div>
      <div className={`${classes.control} ${cityError ? classes.invalid : ''}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" value={city} onChange={cityChangeHandler} onBlur={cityBlurHandler} />
        {cityError && <p>Please enter a valid city!</p>}
      </div>
      <div className={`${classes.control} ${postalError ? classes.invalid : ''}`}>
        <label htmlFor="postal">Postal</label>
        <input type="text" id="postal" value={postal} onChange={postalChangeHandler} onBlur={postalBlurHandler} />
        {postalError && <p>Please enter a valid postal code (5 digits)!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={onCancel}>Cancel</button>
        <button className={classes.submit}>Submit Order</button>
      </div>
    </form>
  )
};

export default Checkout