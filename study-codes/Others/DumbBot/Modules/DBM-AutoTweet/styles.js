import styled from 'styled-components';
import { shade, transparentize } from 'polished';

import { styles } from '../../temp/configurations';

export const Container = styled.div`
  display: flex;
  flex: 1;
  min-width: 150px;
  max-height: ${styles.maxHeight - 20 - styles.padding * 2}px;
  margin: 10px 10px 10px 10px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

export const MenuBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: row;
`;

export const LineBar = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  button {
    max-height: 20px;
    min-height: 10px;
    padding: 2px 6px;
    margin: 2px;
    border-radius: 4px;
  }
`;

export const SectionContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  max-height: ${styles.maxHeight - 90 - styles.padding * 2}px;

  form {
    display: flex;
    flex: 1;
    width: 100%;
    height: ${styles.maxHeight - 90 - styles.padding * 2}px;
    flex-direction: column;
  }

  textarea {
    display: flex;
    flex: 1;
  }
`;

export const Tweet = styled.p`
  margin: 4px 0 6px 0;
  font-size: 15px;
  color: ${shade(0.3, styles.textColor)};

  button {
    min-width: auto;
    min-height: auto;
    margin: 0 6px 0 0;
    padding: 3px 3px 1px 3px;
    background: ${transparentize(0.8, styles.primaryColor)};
    border: none;
    color: ${shade(0.3, styles.textColor)};

    svg {
      font-size: 13px;
      vertical-align: text-top;
    }
  }
`;

export const List = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  width: 100%;
  flex-direction: column;
  margin-top: 6px;
  overflow: auto;

  h4 {
    margin-bottom: 6px;
  }
`;
