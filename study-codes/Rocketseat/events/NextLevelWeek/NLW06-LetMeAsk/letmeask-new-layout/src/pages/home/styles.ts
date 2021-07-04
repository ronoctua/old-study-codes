import { lighten } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 650px;
  gap: 80px;
  padding: 14px;
  margin: 60px auto;

  .logo {
    margin-top: -16px;

    svg {
      width: 157px;
      height: 74px;
    }
  }

  h2 {
    font-size: 3rem;
  }

  .welcome-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    gap: 36px;

    div {
      display: flex;
      flex-direction: column;

      gap: 10px;

      h3 {
        max-width: 360px;
        text-align: justify;
      }
    }

    .profile-image-container {
      display: flex;
      align-items: center;

      div {
        height: 80px;
        width: 80px;
        border-radius: 8px;
      }
    }
  }

  .login-or-create-room-container {
    display: flex;
    flex-direction: column;

    gap: 10px;

    button {
      max-width: 264px;
    }

    .sign-with-google-button {
      gap: 20px;
    }
  }

  .existing-rooms-container {
    display: flex;
    flex-direction: column;

    gap: 12px;

    p {
      font-size: 1.8rem;
      padding-bottom: 8px;
    }
  }

  form {
    display: flex;

    gap: 18px;

    button {
      min-width: 54px;
    }

    .room-list {
      display: flex;
      flex-direction: column;
      flex: 1;

      max-height: 210px;
      gap: 14px;
      margin: 8px 0;
      padding: 16px;
      border: 2px solid ${(props) => props.theme.inputBorder};

      overflow: auto;
      background: ${(props) => lighten(0.03, props.theme.background)};

      .room {
        display: flex;
        align-items: center;

        gap: 16px;

        h3 {
          font-size: 1.6rem;
        }
      }
    }
  }

  @media (max-width: 380px) {
    .welcome-container {
      flex-direction: column;
    }

    form {
      flex-direction: column;
    }
  }
`;
