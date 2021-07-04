import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheck, FaStar, FaTrash, FaReply } from 'react-icons/fa';

import { Button } from '@components/Button';
import { Question } from '@components/Question';
import { RoomTitleRow } from '@components/RoomTitleRow';
import { TopBar } from '@components/TopBar';
import { useAuth } from '@hooks/useAuth';
import { useRoom } from '@hooks/useRoom';
import { database } from '@shared/services/firebase';
import { QuestionType } from '@typings/Question';

import { Container } from '../styles';

export default function AdminRoom(): JSX.Element {
  const [allQuestions, setAllQuestions] = useState<QuestionType[]>([]);
  const [questionFilter, setQuestionFilter] = useState('all');
  const { user } = useAuth();
  const router = useRouter();
  const roomId = router.query.roomId;

  const { title, questions, isRoomExists, isRoomActive, authorId } =
    useRoom(roomId);

  if (isRoomExists === false || isRoomActive === false) {
    router.push('/');
  }

  if (user && authorId) {
    user.id !== authorId && router.push('/');
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

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    router.push('/');
  }

  function handleDeleteQuestion(questionId: string) {
    const deleteQuestion = async () => {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();

      toast.dismiss();
      toast.success('Question deleted.');
    };

    toast(
      <div className="toastContent">
        <h3>Are you sure you want to delete this question?</h3>

        <div>
          <Button onClick={() => toast.dismiss()}>Cancel</Button>
          <Button onClick={deleteQuestion}>Remove</Button>
        </div>
      </div>,
      {
        duration: 30000,
      },
    );
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleReturnAnsweredQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: false,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    if (
      allQuestions.filter((question) => question.id === questionId)[0]
        .isHighlighted === true
    ) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted: false,
      });
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted: true,
      });
    }
  }

  return (
    <Container>
      {router.isReady && user && authorId && user.id === authorId && (
        <>
          <header id="room-header">
            <TopBar roomCode={roomId}>
              <div>
                <button onClick={handleEndRoom}>
                  <div>
                    <FaTrash />
                  </div>{' '}
                  CLOSE ROOM
                </button>
              </div>
            </TopBar>
          </header>

          <main id="room-main">
            <RoomTitleRow title={title} questionsCount={questions.length} />

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
                        type="button"
                        title="Highlight the question."
                        className="button-highlight"
                        onClick={() => handleHighlightQuestion(question.id)}>
                        <FaStar /> Highlight
                      </button>

                      <button
                        type="button"
                        title="Mark question as answered."
                        className="button-answered"
                        onClick={() =>
                          handleCheckQuestionAsAnswered(question.id)
                        }>
                        <FaCheck /> Answered
                      </button>
                    </>
                  )}

                  {question.isAnswered && (
                    <button
                      type="button"
                      title="Return the answered question."
                      onClick={() => handleReturnAnsweredQuestion(question.id)}>
                      <FaReply /> Return
                    </button>
                  )}

                  <button
                    type="button"
                    title="Remove the question."
                    onClick={() => handleDeleteQuestion(question.id)}>
                    <FaTrash /> Remove
                  </button>

                  {question.likeCount > 0 && (
                    <div className="like-count">
                      <span>{question.likeCount}</span>
                      {question.likeCount === 1 ? ' vote' : ' votes'}
                    </div>
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
