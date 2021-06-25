import React from 'react';

import { TopBarMainData } from '../TopBarMainData';
// import { TopBarUserData } from '../TopBarUserData';
import { Container } from './styles';

export const TopBarGrid: React.FC = () => {
  return (
    <Container>
      <div id="main-data">
        <TopBarMainData />
      </div>
      {/* <div id="user-data">
        <TopBarUserData />
      </div> */}
    </Container>
  );
};
