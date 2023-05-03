import PropTypes from 'prop-types';
import { GalleryItem } from 'components/GalleryItem/GalleryItem';
import css from 'styles/Styles.module.scss';

export const Gallery = ({ normData }) => (
  <ul className={css.ImageGallery}>
    <GalleryItem normData={normData} />
  </ul>
);

Gallery.propTypes = {
  normalData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};
