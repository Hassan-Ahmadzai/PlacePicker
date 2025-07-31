import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";


const Modal = forwardRef(function Modal({ open, children, onClose }) {
    const dialog = useRef();

    useEffect(() => {
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        };
    }, [open]);

    // useImperativeHandle(ref, () => {    
    //     return {
    //         open: () => {
    //             dialog.current.showModal();
    //         },
    //         close: () => {
    //             dialog.current.close();
    //         },
    //     };
    // });


    return createPortal(
        <dialog className="modal" ref={dialog} onClose={onClose}> 
            {open ? children : null}
        </dialog>,
        document.getElementById('modal-root')
    );
});

export default Modal;