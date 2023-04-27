import { ReactIconSpinner } from './Loader.styled';

export const Spinner = ({ size, message = 'Loading...' }) => (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <ReactIconSpinner size={size} /> {message}
  </span>
);
