import PropTypes from 'prop-types';

import { Container } from './Section.styled';

export const Section = ({ mainTitle, title, children }) => (
  <Container>
    {mainTitle && <h1>{mainTitle}</h1>}
    {title && <h2>{title}</h2>}
    {children}
  </Container>
);

Section.propTypes = {
  mainTitle: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
