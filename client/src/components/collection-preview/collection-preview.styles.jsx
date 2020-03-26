import styled from 'styled-components';

export const CollectionPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleContainer = styled.h1`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;
  width: 5vw;

  &:hover {
    color: gray;
  }
`;

export const PreviewContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-gap: 10px;

& > div {
  margin-bottom: 30px;
}

@media screen and (max-width: 800px){
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
}
`;