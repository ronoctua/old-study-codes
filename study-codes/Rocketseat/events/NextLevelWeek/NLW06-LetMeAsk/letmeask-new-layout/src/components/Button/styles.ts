import { shade } from 'polished';
import styled from 'styled-components';

export const CustomButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px 16px;
  margin-bottom: 3px;
  border: none;
  border-radius: 4px;
  font-weight: 700;
  letter-spacing: 0.4px;

  cursor: pointer;

  color: ${(props) => props.theme.buttonText};
  background: ${(props) => props.theme.buttonBackground};
  box-shadow: 0 3px ${(props) => shade(0.2, props.theme.buttonBackground)};

  &:hover {
    background: ${(props) => shade(0.2, props.theme.buttonBackground)};
    box-shadow: 0 3px ${(props) => shade(0.5, props.theme.buttonBackground)};
  }

  &:active {
    transform: translateY(0.5px);
    box-shadow: 0 2.5px ${(props) => shade(0.5, props.theme.buttonBackground)};
  }

  &:focus {
    outline: 0;
    color: ${(props) => props.theme.focusText};
    background: ${(props) => props.theme.focus};
    box-shadow: 0 3px ${(props) => shade(0.5, props.theme.focus)};

    &:hover {
      background: ${(props) => shade(0.05, props.theme.focus)};
      box-shadow: 0 3px ${(props) => shade(0.5, props.theme.focus)};
    }
  }

  &:disabled {
    opacity: 0.6;
    background: ${(props) => props.theme.error};
    box-shadow: 0 3px ${(props) => shade(0.5, props.theme.error)};
    cursor: not-allowed;
  }

  img {
    margin-right: 8px;
  }
`;
