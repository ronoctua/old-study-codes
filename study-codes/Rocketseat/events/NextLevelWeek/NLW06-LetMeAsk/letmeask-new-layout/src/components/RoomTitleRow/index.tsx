import { ReactNode } from 'react';

import { Container } from './styles';

type RoomTitleRowProps = {
  title: string;
  questionsCount: number;
  children?: ReactNode;
};

export function RoomTitleRow({
  title,
  questionsCount,
  children,
}: RoomTitleRowProps): JSX.Element {
  return (
    <Container>
      <div className="room-title">
        <h1>
          <span>Room </span>
          {title}
        </h1>
      </div>

      {children}

      <div className="badge">
        {questionsCount > 0 ? (
          <span>
            {questionsCount}{' '}
            {questionsCount === 1 ? (
              <span>question</span>
            ) : (
              <span>questions</span>
            )}
          </span>
        ) : (
          <span>Be the first one to ask.</span>
        )}
      </div>
    </Container>
  );
}
