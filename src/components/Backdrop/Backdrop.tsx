import ReactDOM from 'react-dom';

import './Backdrop.css';

type BackdropProps = {
  open: boolean;
  onClick: () => void;
};

function Backdrop(props: BackdropProps) {
  return ReactDOM.createPortal(
    <div
      className={['backdrop', props.open ? 'open' : ''].join(' ')}
      onClick={props.onClick}
    />,
    document.getElementById('backdrop-root')!
  );
}

export default Backdrop;
