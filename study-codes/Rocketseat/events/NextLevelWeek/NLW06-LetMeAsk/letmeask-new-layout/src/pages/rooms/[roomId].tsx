import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaArrowUp, FaCheck } from 'react-icons/fa';

import { Button } from '@components/Button';
import { ProfileImage } from '@components/ProfileImage';
import { Question } from '@components/Question';
import { RoomTitleRow } from '@components/RoomTitleRow';
import { TopBar } from '@components/TopBar';
import { useAuth } from '@hooks/useAuth';
import { useRoom } from '@hooks/useRoom';
import { database } from '@shared/services/firebase';
import { QuestionType } from '@typings/Question';

import { Container } from './styles';

export default function Room(): JSX.Element {
  const [newQuestion, setNewQuestion] = useState('');
  const [textareaCharactersCounter, setTextareaCharactersCounter] = useState(0);
  const [allQuestions, setAllQuestions] = useState<QuestionType[]>([]);
  const [questionFilter, setQuestionFilter] = useState('all');
  const [formStatus, setFormStatus] = useState('hide');

  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();

  const roomId = router.query.roomId;

  const { title, questions, isRoomExists, isRoomActive } = useRoom(roomId);

  if (isRoomExists === false || isRoomActive === false) {
    router.push('/');
  }

  useEffect(() => {
    if (questionFilter === 'not-answered') {
      setAllQuestions(questions.filter((question) => !question.isAnswered));
    } else if (questionFilter === 'answered') {
      setAllQuestions(questions.filter((question) => question.isAnswered));
    } else {
      setAllQuestions(questions);
    }
  }, [questionFilter, questions]);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '' || newQuestion.length > 400) {
      return;
    }

    if (!user) {
      toast.error('You must be logged in.');

      return;
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
    setFormStatus('hide');

    toast.success('Question submitted.');
  }

  async function handleLikeQuestion(
    questionId: string,
    likeId: string | undefined,
  ) {
    if (likeId) {
      await database
        .ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
        .remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      });
    }
  }

  return (
    <Container>
      {router.isReady && (
        <>
          <header id="room-header">
            <TopBar roomCode={roomId} />
          </header>

          <main id="room-main">
            <RoomTitleRow title={title} questionsCount={questions.length} />

            {user ? (
              formStatus === 'show' ? (
                <form onSubmit={handleSendQuestion}>
                  <div className="text-area-container">
                    <textarea
                      placeholder="Write your question here."
                      onChange={(event) => {
                        setNewQuestion(event.target.value);
                        setTextareaCharactersCounter(event.target.value.length);
                      }}
                      rows={3}
                      maxLength={400}
                      value={newQuestion}
                    />
                    <div className="textarea-complements">
                      <div>{textareaCharactersCounter} / 400</div>
                    </div>
                  </div>

                  <div className="form-side">
                    <div className="user-info">
                      <div className="profile-image-container">
                        <ProfileImage
                          imageUrl={user.avatar}
                          title={user.name}
                        />
                      </div>

                      <span>{user.name}</span>
                    </div>

                    <Button
                      type="submit"
                      disabled={!user || textareaCharactersCounter > 400}>
                      SUBMIT
                    </Button>
                  </div>
                </form>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}

            <div className="question-control">
              <div className="question-filters">
                <button
                  className={questionFilter === 'all' ? 'current' : ''}
                  onClick={() => setQuestionFilter('all')}>
                  All
                </button>

                <button
                  className={questionFilter === 'not-answered' ? 'current' : ''}
                  onClick={() => setQuestionFilter('not-answered')}>
                  Not answered
                </button>

                <button
                  className={questionFilter === 'answered' ? 'current' : ''}
                  onClick={() => setQuestionFilter('answered')}>
                  Answered
                </button>
              </div>

              <div className="ask-container">
                {formStatus === 'show' ? (
                  <button onClick={() => setFormStatus('hide')}>
                    Hide Form
                  </button>
                ) : user ? (
                  <button
                    disabled={!user}
                    onClick={() => setFormStatus('show')}>
                    Ask Something
                  </button>
                ) : (
                  <div>
                    <button
                      onClick={async () => !user && (await signInWithGoogle())}>
                      Login to ask
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="question-list">
              {allQuestions.map((question) => (
                <Question key={question.id} targetQuestion={question}>
                  {question.isAnswered && (
                    <div className="answered-label">Answered</div>
                  )}

                  {!question.isAnswered && (
                    <>
                      <button
                        className={`like-button ${
                          question.likeId ? 'voted' : ''
                        }`}
                        type="button"
                        aria-label="UP VOTE"
                        onClick={() =>
                          handleLikeQuestion(question.id, question.likeId)
                        }>
                        {question.likeId ? (
                          <>
                            <FaCheck /> Voted
                          </>
                        ) : (
                          <>
                            <FaArrowUp /> Up vote
                          </>
                        )}
                      </button>

                      {question.likeCount > 0 && (
                        <div className="like-count">
                          <span>{question.likeCount}</span>
                          {question.likeCount === 1 ? ' vote' : ' votes'}
                        </div>
                      )}
                    </>
                  )}
                </Question>
              ))}
            </div>
          </main>
        </>
      )}
    </Container>
  );
}
