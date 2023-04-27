import errorImage from 'img/mark-error.png';

import { Div } from './All.styled';

export const ErrorView = ({ message }) => (
  <Div role="alert">
    <span>{message}</span>
    <img src={errorImage} width="100" height="100" alt="cross"></img>
  </Div>
);
