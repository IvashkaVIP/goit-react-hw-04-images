import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  // console.log("Modal");

  useEffect(() => {
    const handleKeyDown = ({ code }) => {
      if (code === 'Escape') {
        //   console.log('Modal >>> handleKeyDown : Escape');
        onClose();
      }
    };

    console.log('add listener  ', Date.now());
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      console.log('remove listener  ', Date.now());
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      //   console.log('Modal >>>  Click on BackDrop');
      onClose();
    }
  };

  return createPortal(
    <>
      <div className={css.Overlay} onClick={handleBackdropClick}>
        <div className={css.Modal}>{children}</div>
      </div>
    </>,
    modalRoot
  );
};

PropTypes.Modal = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};
