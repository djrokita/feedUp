import './Input.css';


type InputProps = {
  valid: boolean;
  id: string;
  label: string;
  touched: string;
  type: string;
  required: boolean;
  value: string;
  placeholder?: string;
  onChange: (id: string, value: string, files?: HTMLInputElement["files"]) => void;
  onBlur: () => void;
}

const Input = (props: InputProps) => {
  return (
    <div className="input">
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input
        className={[
          !props.valid ? 'invalid' : 'valid',
          props.touched ? 'touched' : 'untouched'
        ].join(' ')}
        type={props.type}
        id={props.id}
        required={props.required}
        value={props.value}
        name={props.id}
        placeholder={props.placeholder}
        onChange={e => props.onChange(props.id, e.target.value, e.target.files)}
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
}

export default Input;
