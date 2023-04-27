import { ImSpinner2 as spinnerIcon } from 'react-icons/im';
import styled from 'styled-components';

export const ReactIconSpinner = styled(spinnerIcon)`
  margin-right: 10px;
  animation: icon-spin 2s infinite linear;

  @keyframes icon-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
`;
