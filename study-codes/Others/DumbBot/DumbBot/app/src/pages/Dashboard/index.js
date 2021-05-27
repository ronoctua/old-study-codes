import React from 'react';

import {
  Container,
  TopLine,
  MiddleLine,
  BottomLine,
  TopLeft,
  TopCenter,
  TopRight,
  MiddleLeft,
  MiddleCenter,
  MiddleRight,
  BottomLeft,
  BottomCenter,
  BottomRight,
} from './styles';
import {
  ModulesTopLeft,
  ModulesTopCenter,
  ModulesTopRight,
  ModulesMiddleLeft,
  ModulesMiddleCenter,
  ModulesMiddleRight,
  ModulesBottomLeft,
  ModulesBottomCenter,
  ModulesBottomRight,
} from '../../temp/modules';

function Dashboard() {
  return (
    <Container>
      <TopLine>
        <TopLeft>
          <ModulesTopLeft />
        </TopLeft>
        <TopCenter>
          <ModulesTopCenter />
        </TopCenter>
        <TopRight>
          <ModulesTopRight />
        </TopRight>
      </TopLine>
      <MiddleLine>
        <MiddleLeft>
          <ModulesMiddleLeft />
        </MiddleLeft>
        <MiddleCenter>
          <ModulesMiddleCenter />
        </MiddleCenter>
        <MiddleRight>
          <ModulesMiddleRight />
        </MiddleRight>
      </MiddleLine>
      <BottomLine>
        <BottomLeft>
          <ModulesBottomLeft />
        </BottomLeft>
        <BottomCenter>
          <ModulesBottomCenter />
        </BottomCenter>
        <BottomRight>
          <ModulesBottomRight />
        </BottomRight>
      </BottomLine>
    </Container>
  );
}

export default Dashboard;
