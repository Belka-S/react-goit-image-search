import PropTypes from 'prop-types';
import css from 'styles/Styles.module.scss';

export const Button = ({ handleClick }) => (
  <button className={css.Button} onClick={handleClick}>
    Load more
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
};
