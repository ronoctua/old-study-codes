import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Topbar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 12px 3px 10px;
  border-bottom: 1px #e1e1e1 solid;
  background: #e5e5ee;
`;

export const Logo = styled.div`
  display: flex;
  padding: 8px 44px 0 6px;
`;

export const Form = styled.form<FormProps>`
  display: flex;
  flex: 1;
  max-width: 700px;

  input {
    flex: 1;
    height: 45px;
    padding: 0 14px 2px 14px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #444;
    border: 3px #fff solid;
    border-right: 0;

    ${(props) =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}

    &::placeholder {
      color: #999;
    }
  }

  button {
    width: 90px;
    height: 44px;
    padding-top: 2px;
    background: #6c2bd4;
    border-radius: 0 5px 5px 0;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#6c2bd4')};
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin: 8px 0 0 12px;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
`;

export const Sidebar = styled.div`
  display: flex;
  max-width: 350px;
  height: 100%;
  padding: 14px 6px;
  border-right: 1px #e1e1e1 solid;
`;

export const Repositories = styled.div`
  button {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 8px;
    border: none;
    text-align: left;
    background: none;
    transition: transform 0.2s;

    &:hover {
      transform: translateX(10px);
    }

    img {
      width: 54px;
      height: 54px;
      border-radius: 50%;
    }

    div {
      flex: 1;
      margin: 0 16px;
      font-size: 14px;

      strong {
        color: #3d3d4d;
      }

      p {
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;

export const RepositoryInfo = styled.div`
  display: flex;
  flex: 1;
  background: #fff;

  div.all-content {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  div.repository-bar {
    display: flex;
    flex: 1;
    flex-direction: row;
    max-height: 44px;
    padding: 10px 14px;
    border-bottom: 1px #e1e1e1 solid;
    color: #929292;

    div {
      display: flex;
    }

    div.navigation-address-box {
      flex: 1;

      span {
        padding: 0 3px 0 7px;
        font-size: 14px;
        vertical-align: top;
      }
    }

    a {
      text-decoration: none;
      color: #929292;
    }

    button {
      border: none;
      background: none;
      color: #b9b9b9;
    }
  }

  div.box-info-and-avatar {
    display: flex;
    flex-direction: row;
    padding: 16px;
  }

  div.repository-info {
    display: flex;
    flex: 1;
    flex-direction: column;
    color: #25262b;

    p {
      padding-bottom: 10px;
    }

    strong {
      padding-right: 8px;
    }
  }

  div.avatar {
    display: flex;

    a {
      text-decoration: none;
    }

    img {
      width: 216px;
      height: 216px;
      border-radius: 14px;
    }
  }

  div.description {
    display: flex;
    flex-direction: column;
    padding: 16px;
    color: #25262b;

    p.description-text {
      padding-top: 10px;
    }

    span {
      color: #55575e;
      font-size: 18px;
    }
  }

  div.issues {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 16px;
    color: #25262b;

    a {
      background: #ececf0;
      border-radius: 5px;
      width: 100%;
      padding: 16px 7px;
      margin-top: 16px;
      display: block;
      text-decoration: none;

      display: flex;
      align-items: center;
      transition: transform 0.2s;

      &:hover {
        transform: translateX(10px);
      }

      div {
        margin: 0 16px;
        flex: 1;

        strong {
          font-size: 15px;
          color: #3c3c3c;
        }

        p {
          font-size: 16px;
          color: #9898a6;
          margin-top: 4px;
        }
      }

      svg {
        margin-left: auto;
        color: #b2b2c6;
      }
    }
  }
`;
