import PropTypes from 'prop-types';
import css from 'styles/Styles.module.scss';

export const GalleryItem = ({ normalData, toggleModal }) =>
  normalData.map(el => (
    <li
      className={css.ImageGalleryItem}
      key={el.id}
      onClick={() =>
        toggleModal({ largeImageURL: el.largeImageURL, tags: el.tags })
      }
    >
      <img
        className={css['ImageGalleryItem-image']}
        src={el.webformatURL}
        alt={el.tags}
      />
    </li>
  ));

GalleryItem.propTypes = {
  normalData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};
