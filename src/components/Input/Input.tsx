import classNames from 'classnames';
import { ChangeEvent } from 'react';

import './Input.css';


type InputProps<T> = {
  valid: boolean;
  id: T;
  label: string;
  touched: boolean;
  type: string;
  required: boolean;
  value: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
};

const Input = <T extends string>(props: InputProps<T>) => {
  const className = classNames(!props.valid ? 'invalid' : 'valid', props.touched ? 'touched' : 'untouched');

  return (
    <div className="input">
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input
        className={className}
        type={props.type}
        id={props.id}
        required={props.required}
        value={props.value}
        name={props.id}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {/* {props.control === 'textarea' && (
      <textarea
      className={[
        !props.valid ? 'invalid' : 'valid',
        props.touched ? 'touched' : 'untouched'
      ].join(' ')}
      id={props.id}
      rows={props.rows}
      required={props.required}
      value={props.value}
      onChange={e => props.onChange(props.id, e.target.value)}
      onBlur={props.onBlur}
      />
    )} */}
    </div>
  );
};

export default Input;
