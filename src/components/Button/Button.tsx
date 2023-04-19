import './Button.css';

type ButtonProps = {
  btnStyles: string;
  text: string;
  disabled?: boolean;
  loading?: boolean;
  // type: React.ButtonHTMLAttributes<HTMLButtonElement>;
  // onClick: () => null;
};

function Button(props: ButtonProps) {
  return <button
    className={props.btnStyles}
    // onClick={props.onClick}
    disabled={props.disabled || props.loading}
    // type={props.type}
    type="submit"
  >
    {props.loading ? 'Loading...' : props.text}
  </button>;

  // <Link
  //   className={[
  //     'button',
  //     `button--${props.design}`,
  //     `button--${props.mode}`
  //   ].join(' ')}
  //   to={props.link}
  // >
  //   {props.children}
  // </Link>
}

export default Button;
