import styled from 'styled-components';

interface IImageElementProps {
  imageUrl: string;
}

export const ImageElement = styled.div<IImageElementProps>`
  display: flex;

  height: 100%;
  width: 100%;

  background-image: url('${(props) => props.imageUrl}');
  background-size: cover;
  background-repeat: no-repeat;
`;
