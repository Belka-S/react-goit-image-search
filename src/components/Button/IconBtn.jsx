import PropTypes from 'prop-types';
import { ReactComponent as CloseIcon } from 'img/svg/close.svg';
import css from 'styles/Styles.module.scss';

// Icon Button
export const IconBtn = ({ closeModal }) => (
  <button
    className={css.IconButton}
    type="button"
    onClick={closeModal}
    aria-label="close modal"
  >
    <CloseIcon width="16" height="16" />
  </button>
);

IconBtn.defaultProps = { onClick: null };

IconBtn.propTypes = {
  onClick: PropTypes.func,
};
