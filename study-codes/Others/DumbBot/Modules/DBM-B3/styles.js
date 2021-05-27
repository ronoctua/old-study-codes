import styled from 'styled-components';
import { shade } from 'polished';

import { styles } from '../../temp/configurations';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: left;
  flex-direction: column;
  max-height: ${styles.maxHeight - 54 - styles.padding * 2}px;
  margin: 20px;
  overflow: auto;

  button {
    min-width: auto;
    min-height: auto;
    margin: 0 8px 0 0;
    padding: 2px 4px 0px 4px;
    font-size: 15px;
    border-radius: 6px;
    font-weight: bold;
  }

  h4 {
    align-self: center;
  }

  i {
    padding-left: 8px;
    align-self: center;
    font-size: 11px;
    font-weight: bold;
    color: ${shade(0.6, styles.textColor)};
  }

  div {
    display: flex;
    flex-direction: row;
    font-size: 12px;

    span {
      min-width: 70px;
      margin-top: 10px;
    }
  }
`;
