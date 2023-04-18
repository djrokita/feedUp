import classNames from 'classnames'

import './Button.css';

type ButtonProps = {
  design: string;
  mode?: string;
  disabled: boolean;
  loading: boolean;
  text: string;
  // type: React.ButtonHTMLAttributes<HTMLButtonElement>;
  // onClick: () => null;
}

function Button(props: ButtonProps) {

  const className = classNames('button',
    `button--${props.design}`, {
    [`button--${props.mode}`]: props.mode
  }
  )

  return <button
    className={className}
    // onClick={props.onClick}
    disabled={props.disabled || props.loading}
    // type={props.type}
    type="submit"
  >
    {props.loading ? 'Loading...' : props.text}
  </button>

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
