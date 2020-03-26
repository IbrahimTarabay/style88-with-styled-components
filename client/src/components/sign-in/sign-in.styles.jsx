import styled from 'styled-components';

export const SignInContainer = styled.div`
  width: 410px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 800px) {
    width: 250px;
  }
`;

export const SignInTitle = styled.h2`
  margin: 10px 0;

  @media screen and (max-width: 800px) {
    margin: 5px 0;
    font-size: 22px;
  }
`;

export const ButtonsBarContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    display: grid;
    grid-gap: 10px
  }
`;