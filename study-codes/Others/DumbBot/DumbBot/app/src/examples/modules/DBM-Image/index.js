import React from 'react';

import { Container } from './styles';

import targetImage from './image.svg';

function DBMImage() {
  return (
    <Container>
      <img src={targetImage} alt="DMB-Image_Module" />
    </Container>
  );
}

export default DBMImage;
