import PropTypes from 'prop-types';
import { ReactComponent as CloseIcon } from 'img/svg/close.svg';
import css from 'styles/Styles.module.scss';

// Icon Button
export const IconBtn = ({ toggleModal }) => (
  <button
    className={css.IconButton}
    type="button"
    onClick={toggleModal}
    aria-label="close modal"
  >
    <CloseIcon width="24" height="24" />
  </button>
);

IconBtn.defaultProps = { onClick: null };

IconBtn.propTypes = {
  onClick: PropTypes.func,
};
