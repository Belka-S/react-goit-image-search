import PropTypes from 'prop-types';
import { GalleryItem } from 'components/GalleryItem/GalleryItem';
import css from 'styles/Styles.module.scss';

export const Gallery = ({ normData }) => (
  <ul className={css.ImageGallery}>
    {normData.map(item => (
      <li className={css.ImageGalleryItem} key={item.id}>
        <GalleryItem
          normData={normData}
          webformatURL={item.webformatURL}
          tags={item.tags}
        />
      </li>
    ))}
  </ul>
);

Gallery.propTypes = {
  normData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};
