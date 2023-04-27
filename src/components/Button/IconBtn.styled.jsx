import styled from 'styled-components';

export const Btn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;

  margin: 0;
  padding: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 1px solid black;
  border-radius: 50%;
  cursor: pointer;
  color: white;
  background-color: transparent;
  font: inherit;
  transition: fill 250ms;

  &:hover,
  &:focus {
    fill: tomato;
  }
`;
