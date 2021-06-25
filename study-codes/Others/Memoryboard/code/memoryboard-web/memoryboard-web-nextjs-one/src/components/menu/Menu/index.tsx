import React from 'react';
import {
  FiMessageSquare,
  FiPenTool,
  FiFilePlus,
  FiLayers,
  FiMenu,
} from 'react-icons/fi';

import { Container } from './styles';

const Menu: React.FC = () => {
  return (
    <Container>
      <div id="menu">
        <nav>
          <a href="#">
            <FiMessageSquare />
          </a>
          <a href="#">
            <FiPenTool />
          </a>
          <a href="#">
            <FiFilePlus />
          </a>
          <a href="#">
            <FiLayers />
          </a>
          <a href="#">
            <FiMenu />
          </a>
        </nav>
      </div>
    </Container>
  );
};

export { Menu };
