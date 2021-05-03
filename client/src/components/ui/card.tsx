import classes from './card.module.css';

const Card: React.FC = ({ children }) => (
  <div className={classes.card}>
    {children}
  </div>
);

export default Card;