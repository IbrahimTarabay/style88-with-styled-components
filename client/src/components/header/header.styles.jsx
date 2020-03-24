import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 45px;
`;

export const LogoContainer = styled(Link)`
`;

export const Img = styled.img`
 height: 100px;
 width: 110px;
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;

   &:hover {
    color: gray;
   } 
`;