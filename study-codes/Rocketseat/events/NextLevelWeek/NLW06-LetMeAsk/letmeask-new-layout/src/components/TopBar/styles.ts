import { lighten, shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 1;

  border-bottom: 1px solid ${(props) => shade(0.03, props.theme.background)};
  border-top: none;
  border-left: none;
  border-right: none;

  background: ${(props) => lighten(0.06, props.theme.background)};

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex: 1;

    max-width: 900px;
    min-height: 50px;
    width: 100%;
    margin: 0 auto;
    padding: 0 8px;
    gap: 20px;

    .settings-menu-container:only-child {
      margin-left: auto;
    }
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  button {
    display: flex;
    flex-direction: row;
    align-items: center;

    min-height: 50px;
    gap: 6px;
    margin: 0;
    padding: 0;
    border: none;
    font-size: 1.3rem;
    font-weight: 700;

    background: none;

    &:hover {
      text-decoration: underline;
      text-decoration-thickness: 0.25em;
      text-decoration-color: ${(props) => lighten(0.6, props.theme.text)};
    }

    span {
      display: flex;
      flex-direction: row;
      align-items: center;

      gap: 6px;
      font-size: 1.3rem;
    }

    .code {
      color: ${(props) => props.theme.primary};
    }
  }

  .settings-content {
    display: flex;
    justify-content: center;
    flex: 1;

    width: 100%;

    border-top: 1px solid ${(props) => shade(0.03, props.theme.background)};

    main {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;

      max-width: 900px;
      padding: 8px 0;
      gap: 30px;

      div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        gap: 10px;

        button {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        &.group {
          flex-direction: row;
          gap: 30px;
        }

        &.settings-small-buttons-container {
          align-items: flex-start;

          button {
            align-items: flex-start;

            min-width: 110px;
            min-height: 20px;
          }
        }

        svg {
          max-width: 40px;
          max-height: 40px;
        }
      }
    }
  }

  @media (max-width: 640px) {
    header {
      flex-direction: column;
    }

    .settings-content main div.group {
      flex-direction: column;
    }
  }

  @media (max-width: 380px) {
    .settings-content main {
      flex-direction: column;
    }

    .settings-content main div.group {
      flex-direction: row;
    }
  }
`;
