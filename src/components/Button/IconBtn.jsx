import PropTypes from 'prop-types';
import { ReactComponent as CloseIcon } from 'img/svg/close.svg';
import { BiRightArrow } from 'react-icons/bi';
import { BiLeftArrow } from 'react-icons/bi';
import css from 'styles/Styles.module.scss';

// Icon Button
export const CloseBtn = ({ closeModal }) => (
  <button
    className={css.CloseBtn}
    type="button"
    onClick={closeModal}
    aria-label="close modal"
  >
    <CloseIcon width="20" height="20" />
  </button>
);

CloseBtn.defaultProps = { onClick: null };

CloseBtn.propTypes = {
  onClick: PropTypes.func,
};

export const NextBtn = ({ closeModal }) => (
  <button
    className={css.NextBtn}
    type="button"
    onClick={closeModal}
    aria-label="close modal"
  >
    <BiRightArrow size="32" />
  </button>
);

NextBtn.defaultProps = { onClick: null };

NextBtn.propTypes = {
  onClick: PropTypes.func,
};

export const PrevBtn = ({ closeModal }) => (
  <button
    className={css.PrevBtn}
    type="button"
    onClick={closeModal}
    aria-label="close modal"
  >
    <BiLeftArrow size="32" />
  </button>
);

PrevBtn.defaultProps = { onClick: null };

PrevBtn.propTypes = {
  onClick: PropTypes.func,
};
