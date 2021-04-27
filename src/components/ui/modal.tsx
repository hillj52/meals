import { createPortal } from 'react-dom';
import classes from './modal.module.css';

interface ModalProps {
  onClose: () => void;
}

const portalElement = document.getElementById('overlays');

const Modal: React.FC<ModalProps> = ({ children, onClose }) => (
  <>
    {createPortal(<div className={classes.backdrop} onClick={onClose}></div>, portalElement!)}
    {createPortal(<div className={classes.modal}>
      <div className={classes.content}>
        {children}
      </div>
    </div>, portalElement!)}
  </>
);

export default Modal;