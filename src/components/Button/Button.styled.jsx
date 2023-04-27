import styled from 'styled-components';

export const Btn = styled.button`
  padding: 5px 50px;
  margin-bottom: 20px;

  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: steelblue;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  transition: background-color 250ms;

  &:hover,
  &:focus {
    background-color: #2472b2;
  }

  &:disabled {
    cursor: default;
    background-color: gray;
  }

  &__active {
    background-color: tomato;

    &:hover,
    &:focus {
      background-color: tomato;
    }
  }
`;
