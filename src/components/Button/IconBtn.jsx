import PropTypes from 'prop-types';
import { Btn } from 'components/Button/IconBtn.styled';

// Icon Button
export const IconBtn = ({ children, onClick, ...allyProps }) => (
  <Btn type="button" onClick={onClick} {...allyProps}>
    {children}
  </Btn>
);

IconBtn.defaultProps = { onClick: null, children: null };

IconBtn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func,
  'aria-label': PropTypes.string.isRequired,
};
