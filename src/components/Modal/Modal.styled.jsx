import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 600px;
    min-height: 300px;
    padding: 30px;
    transform: translate(-50%, -50%);
    background-color: white;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
  }
`;
