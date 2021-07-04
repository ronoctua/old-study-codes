import { lighten, shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  gap: 12px;

  margin: 10px 0;
  padding: 6px;

  main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;

    gap: 30px;
    padding: 20px;
    border-radius: 10px;

    border: 5px solid ${(props) => lighten(0.04, props.theme.background)};
    background: ${(props) => lighten(0.04, props.theme.background)};

    .question-data {
      display: flex;
      flex: 1;

      font-size: 1.6rem;
      word-break: break-word;
    }

    .user-data {
      display: flex;
      align-items: center;
      flex: 1;
      gap: 10px;

      color: ${(props) => props.theme.secondaryText};
      font-size: 1.4rem;

      cursor: default;
    }
  }

  .menu {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    min-width: 130px;
    gap: 14px;
    padding: 16px 16px 16px 12px;
    border-radius: 10px;

    background: ${(props) => lighten(0.03, props.theme.background)};

    button,
    .like-count {
      display: flex;
      align-items: center;

      padding: 2px;
      gap: 6px;
      font-size: 1.2rem;
      font-weight: 700;
      border: none;

      background: none;
      text-transform: uppercase;
    }

    button {
      color: ${(props) => props.theme.secondaryText};

      &.voted {
        color: ${(props) => props.theme.primary};
      }
    }

    button:hover {
      color: ${(props) => props.theme.text};
    }

    .like-count {
      color: ${(props) => props.theme.text};
    }

    .like-count span {
      padding-left: 2px;
      font-size: 1.4rem;
      font-weight: 700;

      color: ${(props) => props.theme.primary};
    }

    .answered-label {
      text-transform: uppercase;
      font-size: 1.4rem;
      font-weight: 700;

      color: ${(props) => props.theme.secondaryText};
    }
  }

  &.highlighted {
    main {
      border: 5px solid ${(props) => props.theme.primary}59;

      font-weight: 700;
    }

    .menu button.button-highlight {
      text-decoration: underline;
      text-decoration-thickness: 0.3rem;
      text-decoration-style: solid;
      text-decoration-color: ${(props) => props.theme.secondary}6e;
    }
  }

  &.answered {
    main {
      background: ${(props) => shade(0.03, props.theme.background)};
    }

    p,
    span {
      color: ${(props) => lighten(0.5, props.theme.text)};
    }

    .profile-image-container {
      filter: grayscale(1) opacity(0.5);

      &:hover {
        filter: none;
      }
    }
  }

  .profile-image-container {
    height: 30px;
    width: 30px;

    div {
      border-radius: 50%;
    }
  }

  @media (max-width: 390px) {
    .menu {
      min-width: auto;
    }
  }
`;
