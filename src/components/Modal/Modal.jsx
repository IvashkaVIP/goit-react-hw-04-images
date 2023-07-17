import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  },[]);

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
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
