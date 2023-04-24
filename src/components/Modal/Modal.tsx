import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { buttonStyles } from '../../utils/buttonStyles';

import Button from '../Button/Button';
import './Modal.css';

type ModalProps = PropsWithChildren & {
  title: string;
  isLoading: boolean;
  onAccept: () => void;
  onCancel: () => void;
  acceptEnabled: unknown;
};

function Modal(props: ModalProps) {
  return createPortal(
    <div className="modal">
      <header className="modal__header">
        <h1>{props.title}</h1>
      </header>
      <div className="modal__content">{props.children}</div>
      <div className="modal__actions">
        <Button btnStyles={buttonStyles("danger", "flat")} onClick={props.onCancel} text='Cancel' />
        <Button btnStyles={buttonStyles("raised")}
          text="Accept"
          onClick={props.onAccept}
          disabled={!props.acceptEnabled}
          loading={props.isLoading}
        />
      </div>
    </div >,
    document.getElementById('modal-root')!
  );
}

export default Modal;
