import styled from 'styled-components';

export const Container = styled.section`
  padding-right: 10px;
  padding-left: 10px;
  position: relative;
  line-height: 1.3;
  background-color: #dbe4ed;

  h1,
  h2 {
    padding-bottom: 5px;
    font-family: 'Montserrat', sans-serif;
    &::first-letter {
      color: tomato;
    }
  }

  h1 {
    padding-top: 20px;
    text-align: center;
    font-size: 20px;
    &::first-letter {
      color: inherit;
    }
  }

  @media screen and (min-width: 320px) {
    // max-width: 300px;
  }
  @media screen and (min-width: 768px) {
    padding-right: 34px;
    padding-left: 34px;
    // max-width: 700px;
    h1 {
      padding-top: 40px;
      font-size: 26px;
    }
    h1,
    h2 {
      padding-bottom: 10px;
    }
  }
  @media screen and (min-width: 1280px) {
    padding-right: 65px;
    padding-left: 65px;
    // max-width: 1150px;
    h1 {
      padding-top: 60px;
      font-size: 30px;
    }
    h1,
    h2 {
      padding-bottom: 20px;
    }
  }
`;
