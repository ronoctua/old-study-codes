import cx from 'classnames';
import { ReactNode } from 'react';

import { ProfileImage } from '@components/ProfileImage';
import { QuestionType } from '@typings/Question';

import { Container } from './styles';

type QuestionProps = {
  targetQuestion: QuestionType;
  children?: ReactNode;
};

export const Question = ({
  targetQuestion,
  children,
}: QuestionProps): JSX.Element => {
  const { content, author, isAnswered, isHighlighted } = targetQuestion;

  return (
    <Container
      className={cx(
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered },
      )}>
      <main>
        <div className="question-data">
          <p>{content}</p>
        </div>

        <div className="user-data">
          <div className="profile-image-container">
            <ProfileImage imageUrl={author.avatar} title={author.name} />
          </div>

          <span className="user-name">{author.name}</span>
        </div>
      </main>

      <div className="menu">{children}</div>
    </Container>
  );
};
