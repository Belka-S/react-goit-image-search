import styled from 'styled-components';

import {
  Field as FormikField,
  Form as FormikForm,
  ErrorMessage as FormikError,
} from 'formik';

// Formik Form
export const Form = styled(FormikForm)`
  display: flex;

  label {
    display: flex;
    padding-bottom: 20px;
    margin-right: 30px;
    font-size: 18px;
    font-weight: 700;
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
  }
`;

export const Field = styled(FormikField)`
  width: 200px;
  color: darkblue;
`;

export const ErrorMessage = styled(FormikError)`
  color: tomato;
`;

// Input
export const InputForm = styled.form``;

// Div
export const InputWrap = styled.div`
  display: inline-flex;
  margin-right: 30px;

  label {
    display: flex;
    padding-bottom: 20px;

    font-size: 18px;
    font-weight: 700;

    &:not(:last-child) {
      margin-right: 30px;
    }
  }
`;
