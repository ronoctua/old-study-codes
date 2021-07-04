import { useEffect, useState } from 'react';

import { database } from '@shared/services/firebase';
import { FirebaseQuestions } from '@typings/FirebaseQuestions';
import { QuestionType } from '@typings/Question';

import { useAuth } from './useAuth';

type UseRoomReturn = {
  questions: QuestionType[];
  title: string;
  isRoomExists: boolean;
  isRoomActive: boolean;
  authorId: string;
};

export function useRoom(roomId: string | string[] | undefined): UseRoomReturn {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');
  const [isRoomExists, setIsRoomExists] = useState(true);
  const [isRoomActive, setIsRoomActive] = useState(true);
  const [authorId, setAuthorId] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', (room: any) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions =
        (databaseRoom && databaseRoom.questions) ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([_, like]) => like.authorId === user?.id,
            )?.[0],
          };
        },
      );

      (async () => {
        const roomData = (await roomRef.get()).val();

        if (!roomData || roomData.endedAt) {
          setIsRoomActive(false);
        }

        if (roomData && roomData.authorId) {
          setAuthorId(roomData.authorId);
        }

        setIsRoomExists((await roomRef.get()).exists());
      })();

      setTitle(databaseRoom && databaseRoom.title);

      setQuestions(
        parsedQuestions
          .sort((a, b) =>
            a.likeCount < b.likeCount ? 1 : b.likeCount < a.likeCount ? -1 : 0,
          )
          .sort((a, b) =>
            a.isAnswered < b.isAnswered
              ? 1
              : b.isAnswered < a.isAnswered
              ? -1
              : 0,
          )
          .sort((a, b) =>
            a.isHighlighted < b.isHighlighted
              ? 1
              : b.isHighlighted < a.isHighlighted
              ? -1
              : 0,
          )
          .sort((a, b) =>
            a.isHighlighted && !a.isAnswered < b.isHighlighted && !b.isAnswered
              ? 1
              : b.isHighlighted &&
                !b.isAnswered < a.isHighlighted &&
                !a.isAnswered
              ? -1
              : 0,
          ),
      );
    });

    return () => {
      roomRef.off('value');
    };
  }, [roomId, user?.id]);

  return { questions, title, isRoomExists, isRoomActive, authorId };
}
