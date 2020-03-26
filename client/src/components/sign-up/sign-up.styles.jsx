import styled from 'styled-components';

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 390px;

  @media screen and (max-width: 800px) {
    width: 250px;
  }
`;

export const SignUpTitle = styled.h2`
  margin: 10px 0px;

  @media screen and (max-width: 800px) {
    font-size: 22px;
  }
`;