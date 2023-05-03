import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import css from 'styles/Styles.module.scss';

export const GalleryItem = ({ normData }) => {
  const [modalImage, setModalImage] = useState(null);

  const openModal = ({ largeImageURL, tags }, index) => {
    setModalImage({
      largeImageURL,
      tags,
      index,
    });
  };

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

  const closeModal = () => setModalImage(null);

  return normData.map(el => (
    <li className={css.ImageGalleryItem} key={el.id}>
      <img
        className={css['ImageGalleryItem-image']}
        src={el.webformatURL}
        alt={el.tags}
        onClick={() => openModal(el, normData.indexOf(el))}
      />
      {modalImage && (
        <Modal
          modalImage={modalImage}
          closeModal={closeModal}
          showNextImage={showNextImage}
        />
      )}
    </li>
  ));
};

GalleryItem.propTypes = {
  normData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};
