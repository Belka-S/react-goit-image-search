import PropTypes from 'prop-types';
import { Btn } from 'components/Button/Button.styled';

// Button
export const Button = ({ children, onClick }) => (
  <Btn type="button" onClick={onClick}>
    {children}
  </Btn>
);

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func,
};
