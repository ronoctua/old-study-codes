import styled from 'styled-components';
import { shade } from 'polished';

import { styles } from '../../temp/configurations';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: left;
  text-align: left;
  margin: 20px;
`;

export const TitleBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;

  h1 {
    flex: 1;
    font-size: 16px;
  }

  button {
    min-width: auto;
    min-height: auto;
    margin: 0 8px 0 0;
    padding: 2px 4px 0px 4px;
    font-size: 15px;
    border-radius: 6px;
    font-weight: bold;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  padding: 0 8px 0 4px;
  overflow: auto;

  button {
    display: flex;
    flex: 1;
    min-height: auto;
    margin-top: 0;
    padding: 0;
    font-size: 15px;
    font-weight: normal;
    color: ${styles.textColor};
    background: none;

    span {
      width: 24px;
      height: 100%;
      padding-top: 4px;
      vertical-align: text-bottom;
      font-size: 12px;
      text-align: left;
    }
  }

  button:hover {
    color: ${shade(0.2, styles.textColor)};
    background: none;
  }
`;

export const Active = styled.button`
  span {
    color: ${styles.primaryColor};
  }
`;

export const Inactive = styled.button`
  span {
    color: ${shade(0.6, styles.textColor)};
  }
`;
