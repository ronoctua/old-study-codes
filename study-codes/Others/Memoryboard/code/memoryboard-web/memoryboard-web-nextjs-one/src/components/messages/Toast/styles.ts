import styled, { css } from 'styled-components';

interface IContainerProps {
  messageType?: 'info' | 'success' | 'warning' | 'error';
}

const toastTypes = {
  info: css`
    background: ${(props) => props.theme.colorsOne.infoBg};

    button {
      color: ${(props) => props.theme.colorsOne.infoText};
    }
  `,

  success: css`
    background: ${(props) => props.theme.colorsOne.successBg};

    button {
      color: ${(props) => props.theme.colorsOne.successText};
    }
  `,

  warning: css`
    background: ${(props) => props.theme.colorsOne.warningBg};

    button {
      color: ${(props) => props.theme.colorsOne.warningText};
    }
  `,

  error: css`
    background: ${(props) => props.theme.colorsOne.errorBg};

    button {
      color: ${(props) => props.theme.colorsOne.errorText};
    }
  `,
};

export const Container = styled.div<IContainerProps>`
  position: relative;
  display: flex;

  max-width: 400px;
  margin: 8px;

  border: 1px solid ${(props) => props.theme.colorsOne.errorBorder};
  border-radius: 10px;

  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);

  button {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 12px;
    letter-spacing: 0.1px;

    border-radius: 10px;
    text-align: left;
    background: none;
    border: none;
  }

  p {
    padding-top: 8px;
  }

  ${(props) => toastTypes[props.messageType || 'info']}
`;
