import { useContext } from 'react';
import { CartContext } from '../../../store'; 
import MealItemForm from './meal-item-form';
import classes from './meal-item.module.css';

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface MealItemProps {
  meal: Meal;
}

const MealItem: React.FC<MealItemProps> = ({ meal }) => {
  const { addItem } = useContext(CartContext);

  const addToCartHandler = (amount: number) => {
    addItem({
      ...meal,
      amount,
    });
  }
  
  return (
    <li className={classes.meal}>
      <div>
        <h3>{meal.name}</h3>
        <div className={classes.description}>{meal.description}</div>
        <div className={classes.price}>{`$${meal.price.toFixed(2)}`}</div>
      </div>
      <div>
        <MealItemForm onAddItem={addToCartHandler} />
      </div>
    </li>
  )
};

export default MealItem;