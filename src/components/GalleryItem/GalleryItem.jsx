import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import css from 'styles/Styles.module.scss';

export const GalleryItem = ({ normData, webformatURL, tags }) => {
  const [modalImage, setModalImage] = useState(null);

  const openModal = e => {
    const modalImage = normData.filter(el => el.webformatURL === e.target.src);
    const index = normData.findIndex(el => el.webformatURL === e.target.src);
    setModalImage({ ...modalImage[0], index });
  };

  const closeModal = () => setModalImage(null);

  const showNextImage = step => {
    const { index } = modalImage;
    index === normData.length - 1 && setModalImage({ index: 0 });

    if (step > 0 && index === normData.length - 1) {
      setModalImage({
        index: 0,
        largeImageURL: normData[0].largeImageURL,
        tags: normData[0].tags,
      });
      return;
    }

    if (step < 0 && index === 0) {
      setModalImage({
        index: normData.length - 1,
        largeImageURL: normData[normData.length - 1].largeImageURL,
        tags: normData[normData.length - 1].tags,
      });
      return;
    }

    setModalImage({
      index: index + step,
      largeImageURL: normData[index + step].largeImageURL,
      tags: normData[index + step].tags,
    });
  };

  return (
    <>
      <img
        className={css['ImageGalleryItem-image']}
        src={webformatURL}
        alt={tags}
        onClick={openModal}
      />
      {modalImage && (
        <Modal
          modalImage={modalImage}
          closeModal={closeModal}
          showNextImage={showNextImage}
        />
      )}
    </>
  );
};

GalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  normData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};
