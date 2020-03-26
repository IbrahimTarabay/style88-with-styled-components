import styled, { css } from 'styled-components';

const buttonStyles = css`
  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

const invertedButtonStyles = css`
  background-color: black;
  color:white;

  &:hover{
   background-color: white;
   color: black;
   border: 1px solid black;
  }
`;

const googleSignInStyles = css`
  background-color: #4285f4;
  color: white;

  &:hover {
    background-color: #6495ED;
    border: none;
  }
`;

const getButtonStyles = props => {
  if (props.isGoogleSignIn) {
    return googleSignInStyles;
  }

  return props.inverted ? invertedButtonStyles : buttonStyles;
};

export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  background-color: black;
  color: white;
  text-transform: uppercase;
  font-family: 'Yeon Sung';
  font-weight: 300;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  ${getButtonStyles}

  @media screen and (max-width: 350px){
    font-size: 12px;
  }
`;