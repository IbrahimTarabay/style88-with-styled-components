import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  @media screen and (max-width: 800px){
    height: 60px;
    padding: 10px;
    margin-bottom: 20px;
    margin-left: -11px;
  }
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 50px;
  
  @media screen and (max-width: 800px){
    .logo {
      width: 65px;
      height: 20;
      margin-left: -11px;
      padding-bottom:20px;
      position: relative;
   }
  }

  @media screen and (max-width: 370px){
  .logo {
      width: 53px;
      height: 10;
      padding-bottom:20px;
      position: relative;
   }
  }
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  @media screen and (max-width: 800px){
    width: 80%;
    margin-top: 30px;
    margin-left: 31px;
  }
  @media screen and (max-width: 350px){
    margin-left: 30px;
  }
`;

export const OptionLink = styled(Link)`
  padding: 5px 15px 15px 15px;
  cursor: pointer;

   &:hover {
    color: gray;
   } 

   @media screen and (max-width: 370px){
    width: 80%;
    margin-top: 30px;
    font-size: 14px;
  }
`;