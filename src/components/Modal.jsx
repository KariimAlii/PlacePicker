import { useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = function Modal({ open, children }) {
  const dialog = useRef();

  // now (dialog.current) is undefined
  // so that the first time this component gets executed ,
  // the ref to the dialog will not be set yet

  // in this case => you need to use useEffect()
  // because you need to manipulate the DOM
  // and useEffect() will be executed after the component function gets executed
  open ? dialog.current.showModal() : dialog.current.close();

  return createPortal(
    <dialog className="modal" ref={dialog} open={open}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;
