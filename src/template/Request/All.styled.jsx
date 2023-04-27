import styled from 'styled-components';

export const Form = styled.form`
  display: inline-flex;
  flex-direction: column;
  margin-right: 50px;

  input {
    margin-bottom: 21px;
  }

  button {
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
  }
`;

export const Div = styled.div`
  display: inline-flex;
  gap: 50px;
  align-items: flex-start;

  &:first-child {
    margin-left: 50px;
  }
`;
