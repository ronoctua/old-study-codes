import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { FaPowerOff } from 'react-icons/fa';

import { Button } from '@components/Button';
import { ProfileImage } from '@components/ProfileImage';
import { TopBar } from '@components/TopBar';
import { useAuth } from '@hooks/useAuth';
import { Logo } from '@shared/assets/images/logo';
import { database } from '@shared/services/firebase';

import { Container } from './styles';

type Room = {
  id: string;
  title: string;
  authorId: string;
  endedAt?: string;
};

export default function Home(): JSX.Element {
  const [username, setUsername] = useState('');
  const [adminId, setAdminId] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [rooms, setRooms] = useState<Room[]>([]);

  const { user, signInWithGoogle, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const roomRef = database.ref('rooms');

    roomRef.on('value', (room: any) => {
      const databaseRoom: Room[] = room.val();

      if (databaseRoom) {
        const parsedRooms: Room[] = Object.entries(databaseRoom)
          .filter(([_, value]) => !value.endedAt)
          .map(([key, value]) => {
            return {
              id: key,
              title: value.title,
              authorId: value.authorId,
            };
          });

        setRooms(parsedRooms);
      }
    });
  }, []);

  useEffect(() => {
    user && setUsername(user.name);
  }, [user]);

  async function handleCreateRoom() {
    if (!user) await signInWithGoogle();

    router.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists.');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed.');
      return;
    }

    if (adminId && user.id === adminId) {
      router.push(`/rooms/admin/${roomCode}`);
    } else {
      router.push(`/rooms/${roomCode}`);
    }
  }

  return (
    <>
      <TopBar>
        {user && (
          <div>
            <button
              onClick={async () => {
                await logout();
                router.push('/');
              }}>
              <div>
                <FaPowerOff />
              </div>
              LOGOUT
            </button>
          </div>
        )}
      </TopBar>

      <Container>
        <div className="welcome-container">
          <div>
            <h1>
              Welcome
              {user && (
                <>
                  , <span>{username}</span>
                </>
              )}
              !
            </h1>

            <h3>
              LetMeAsk is a platform that allows you to answer or register
              questions in real-time to be answered during a live stream.
            </h3>
          </div>

          <div>
            <div className="logo">
              <Logo />
            </div>

            <div className="profile-image-container">
              {user && (
                <div>
                  <ProfileImage imageUrl={user.avatar} title={user.name} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="login-or-create-room-container">
          {user ? (
            <>
              <h2>Create a new room </h2>

              <Button onClick={handleCreateRoom} className="create-room-button">
                Create room
              </Button>
            </>
          ) : (
            <>
              <h2>Login to create or manage a room</h2>

              <Button
                onClick={signInWithGoogle}
                className="sign-with-google-button">
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path
                      fill="#4285F4"
                      d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                    />
                    <path
                      fill="#34A853"
                      d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                    />
                  </g>
                </svg>
                Sign in with Google
              </Button>
            </>
          )}
        </div>

        <div className="existing-rooms-container">
          <h2>Choose a room, or type the code bellow</h2>

          <form onSubmit={handleJoinRoom}>
            <input
              type="test"
              placeholder="Enter room code here"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />

            <Button type="submit">Go</Button>
          </form>

          <form onSubmit={handleJoinRoom}>
            <div className="room-list">
              {rooms &&
                rooms.map((room) => (
                  <div key={room.id} className="room">
                    <div>
                      <Button
                        type="submit"
                        value={room.id}
                        onClick={() => setRoomCode(room.id)}>
                        Go
                      </Button>
                    </div>

                    <div>
                      {user && user.id === room.authorId && (
                        <Button
                          type="submit"
                          value={room.id}
                          onClick={() => {
                            setRoomCode(room.id), setAdminId(room.authorId);
                          }}>
                          Admin
                        </Button>
                      )}
                    </div>

                    <div>
                      <h3>{room.title}</h3>
                    </div>
                  </div>
                ))}
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
