import { lighten, shade, invert, transparentize } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  header#room-header {
    display: flex;
    flex-direction: row;
    flex: 1;
  }

  main#room-main {
    display: flex;
    flex-direction: column;
    flex: 1;

    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 30px;
  }

  form {
    margin: 0 5% 40px 5%;
    gap: 20px;

    div {
      display: flex;
      flex-direction: column;
    }

    .text-area-container {
      position: relative;
      flex: 1;

      .textarea-complements {
        position: absolute;
        top: 0px;
        right: 34px;
        display: flex;
        flex-direction: row;
        align-items: baseline;

        gap: 18px;
        padding: 4px 6px 2px 6px;
        font-size: 1.2rem;
        font-weight: 700;
        letter-spacing: 1px;
        border-radius: 0 0 6px 6px;

        color: ${(props) => invert(props.theme.inputBorder)};
        background-color: ${(props) =>
          transparentize(0.15, props.theme.inputBorder)};

        div {
          display: flex;
          align-items: baseline;
        }

        button {
          font-weight: 700;
          border: none;
          background: none;
          color: ${(props) => invert(props.theme.inputBorder)};
        }
      }
    }

    .form-side {
      justify-content: space-between;
    }

    .user-info {
      flex-direction: row;
      align-items: center;

      gap: 10px;
      font-weight: 700;
      font-size: 1.4rem;
    }

    .profile-image-container {
      height: 30px;
      width: 30px;

      div {
        border-radius: 50%;
      }
    }
  }

  .question-control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;

    min-height: 40px;
    gap: 10px;
    margin: 0 8px;

    .ask-container {
      display: flex;
      align-items: center;

      button {
        padding: 10px 14px;
        border: 2px solid ${(props) => shade(0.06, props.theme.background)};
        border-radius: 4px;
        font-size: 1.4rem;
        font-weight: 700;

        color: ${(props) => lighten(0.15, props.theme.text)};
        background: ${(props) => lighten(0.08, props.theme.background)};

        &:hover {
          color: ${(props) => props.theme.text};
          border: 2px solid ${(props) => shade(0.25, props.theme.background)};
        }
      }
    }
  }

  .question-filters {
    display: flex;
    align-items: center;

    gap: 10px;

    button {
      padding: 4px 8px;
      font-size: 1.4rem;
      font-weight: 700;
      border-radius: 8px;
      border: none;

      opacity: 0.6;
      color: ${(props) => props.theme.text};
      background: ${(props) => props.theme.background};

      &:hover {
        opacity: 0.9;
      }

      &.current {
        text-decoration: underline;
        text-decoration-thickness: 0.3em;
        text-decoration-color: ${(props) =>
          lighten(0.3, props.theme.secondaryText)};
        opacity: 1;
        cursor: default;

        &:hover {
          color: ${(props) => props.theme.text};
        }
      }
    }
  }

  @media (max-width: 390px) {
    .question-control {
      flex-direction: column;
    }
  }
`;
