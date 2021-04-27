import { forwardRef } from 'react';
import { InputHTMLAttributes } from 'react';
import classes from './input.module.css';

interface InputProps {
  label: string;
  input: InputHTMLAttributes<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, input }, ref) => (
  <div className={classes.input}>
    <label htmlFor={input.id}>{label}</label>
    <input ref={ref} id={input.id} {...input} />
  </div>
));

export default Input;