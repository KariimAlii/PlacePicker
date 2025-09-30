import {useEffect, useRef} from 'react';
import { createPortal } from 'react-dom';

const Modal = function Modal({ open, children }) {
  const dialog = useRef();

  useEffect(() => {
    // in this case => you need to use useEffect()
    // because you need to manipulate the DOM
    // and useEffect() will be executed after the component function gets executed
    open ? dialog.current.showModal() : dialog.current.close();
  }, [open]) // having an empty array of dependencies will give you a warning !!

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;
