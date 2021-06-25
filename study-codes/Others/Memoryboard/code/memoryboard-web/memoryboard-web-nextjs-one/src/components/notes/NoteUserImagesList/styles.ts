import styled from 'styled-components';

interface IButtonProps {
  background: string | null;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;

  height: 100%;
  min-height: 30px;

  overflow: auto;

  background-color: ${(props) => props.theme.colorsSix.bgOne};

  nav {
    display: flex;
    justify-content: space-between;
    flex: 1;
    align-items: center;

    height: 100%;
  }
`;

export const Button = styled.div<IButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  min-width: 34px;
  min-height: 34px;
  width: 34px;
  height: 34px;
  margin-right: 4px;
  border-radius: 50%;

  color: ${(props) => props.theme.colorsSix.bgTwo};
  background-image: url('${(props) => props.background}');
  background-color: ${(props) => props.theme.colorsSix.bgTwo};
  background-size: cover;
  background-repeat: no-repeat;

  &:first-child {
    margin-left: 4px;
  }
`;
