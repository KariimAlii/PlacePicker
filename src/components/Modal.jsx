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

  // Effect Dependencies would be functions or context values that depend on or use (State) or (Props)
  // why ?? because any change in state or props will cause a component function to re-execute again and consequentially useEffect() to execute again
  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;
