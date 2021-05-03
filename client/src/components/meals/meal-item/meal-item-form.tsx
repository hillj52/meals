import { createRef, useState } from 'react';
import Input from '../../ui/input';
import classes from './meal-item-form.module.css';

interface MealItemFormProps {
  onAddItem: (amount: number) => void
}

const MealItemForm: React.FC<MealItemFormProps> = ({ onAddItem }) => {
  
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = createRef<HTMLInputElement>();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!amountInputRef.current || !amountInputRef.current.value || amountInputRef.current.value.trim() === '') {
      setAmountIsValid(false);
      return;
    }
    const amount = +amountInputRef.current.value;
    if (amount < 1 || amount > 10) {
      setAmountIsValid(false);
      return;
    }
    setAmountIsValid(true);
    onAddItem(amount);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input label='Amount' ref={amountInputRef} input={{
        id: 'amount', 
        type: 'number',
        min: 1,
        max: 10,
        step: 1,
        defaultValue: 1 
      }}/>
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount</p>}
    </form>
    )
;}

export default MealItemForm