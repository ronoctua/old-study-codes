import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 14px;
  margin: 26px 0 10px 0;
  padding: 6px;

  .room-title {
    display: flex;
    flex: 1;

    word-break: break-word;

    span {
      font-weight: 400;

      color: ${(props) => props.theme.secondaryText};
    }
  }

  .badge {
    display: flex;
    align-items: center;

    height: 40px;
    padding: 12px;
    border-radius: 14px;
    font-size: 1.6rem;
    font-weight: 700;

    color: ${(props) => props.theme.primary};
    background: ${(props) => props.theme.primary}1f;

    cursor: default;
  }

  @media (max-width: 450px) {
    flex-direction: column;
  }
`;
