import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CloseBtn, NextBtn, PrevBtn } from 'components/Button/IconBtn';
import { createPortal } from 'react-dom';
import css from 'styles/Styles.module.scss';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({
  closeModal,
  showNextImage,
  modalImage: { largeImageURL, tags },
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const handleKeyDown = e => {
      e.key === 'Escape' && closeModal();
      e.key === 'ArrowRight' && showNextImage(1);
      e.key === 'ArrowLeft' && showNextImage(-1);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal, showNextImage]);

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
        {isImageLoaded && (
          <>
            <CloseBtn closeModal={closeModal} />
            <NextBtn closeModal={() => showNextImage(1)} />
            <PrevBtn closeModal={() => showNextImage(-1)} />
          </>
        )}
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  showNextImage: PropTypes.func.isRequired,
  modalImage: PropTypes.shape({
    largeImageURL: PropTypes.string,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
