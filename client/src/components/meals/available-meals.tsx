import { useEffect } from 'react';
import useHttp, { RequestTypes } from '../../hooks/use-http';
import Card from '../ui/card';
import classes from './available-meals.module.css';
import MealItem, { Meal } from './meal-item/meal-item';

const AvailableMeals: React.FC = () => {
 
  const [meals, loading, error, sendRequest] = useHttp<Meal[], string>();

  useEffect(() => {
    sendRequest({
      url: 'http://localhost:3001/meals',
      requestType: RequestTypes.GET,
    })
  }, []);

  return (
    <section className={classes.meals}>
      <Card >
        <ul>
          {meals && meals.map(meal => <MealItem key={meal.id} meal={meal}/>)}
        </ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;