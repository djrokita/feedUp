import classNames from 'classnames';
import { cloneElement, ReactElement } from 'react';

import './Input.css';


type InputProps<T> = {
  children: ReactElement;
  valid: boolean;
  id: T;
  label: string;
  touched: boolean;
};

const TextField = <T extends string>(props: InputProps<T>) => {
  const className = classNames(!props.valid ? 'invalid' : 'valid', props.touched ? 'touched' : 'untouched');

  return (
    <div className="input">
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      {cloneElement(props.children, { className })}
    </div>
  );
};

export default TextField;
