import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IconBtn } from 'components/Button/IconBtn';
import { createPortal } from 'react-dom';
import css from 'styles/Styles.module.scss';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, modalImage: { largeImageURL, tags } }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const handleKeyDown = e => {
      e.key === 'Escape' && closeModal();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleBackdropClick = e => e.target === e.currentTarget && closeModal();

  return createPortal(
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img
          className={css.Image}
          src={largeImageURL}
          alt={tags}
          onLoad={e => setIsImageLoaded(e.target.isConnected)}
        />
        {isImageLoaded && <IconBtn closeModal={closeModal} />}
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalImage: PropTypes.shape({
    largeImageURL: PropTypes.string,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
