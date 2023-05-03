import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import css from 'styles/Styles.module.scss';

export const GalleryItem = ({ normalData }) => {
  const [modalImage, setModalImage] = useState(null);

  const openModal = ({ largeImageURL, tags }) => {
    setModalImage({
      largeImageURL,
      tags,
    });
  };

  const closeModal = () => setModalImage(null);

  return normalData.map(el => (
    <li className={css.ImageGalleryItem} key={el.id}>
      <img
        className={css['ImageGalleryItem-image']}
        src={el.webformatURL}
        alt={el.tags}
        onClick={() => openModal(el)}
      />
      {modalImage && <Modal modalImage={modalImage} closeModal={closeModal} />}
    </li>
  ));
};

GalleryItem.propTypes = {
  normalData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};
