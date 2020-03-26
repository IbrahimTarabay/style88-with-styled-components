import styled from 'styled-components';

export const SignInAndSignUpContainer = styled.div`
  width: 900px;
  display: flex;
  justify-content: space-between;
  margin: 30px auto;

  @media screen and (max-width: 800px) {
    display: grid;
    flex-direction: column;
    width: 250px;
    align-items: center;
    > *:first-child {
      margin-bottom: 50px;
    }
  }
`;