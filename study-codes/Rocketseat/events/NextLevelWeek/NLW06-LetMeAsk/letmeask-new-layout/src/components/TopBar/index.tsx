import { useRouter } from 'next/router';
import { ReactNode, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { BsFillGearFill } from 'react-icons/bs';
import { FaChevronLeft, FaComment } from 'react-icons/fa';

import { ThemeChanger } from '@contexts/ThemeContext';
import { Dark } from '@shared/assets/images/dark';
import { Light } from '@shared/assets/images/light';
import { Potato } from '@shared/assets/images/potato';
import { Reptilian } from '@shared/assets/images/reptilian';
import { Unicorn } from '@shared/assets/images/unicorn';

import { Container } from './styles';

type TopBarProps = {
  roomCode?: string | string[] | undefined;
  backButton?: boolean;
  children?: ReactNode;
};

export function TopBar({
  roomCode,
  backButton,
  children,
}: TopBarProps): JSX.Element {
  const [isSettingsHide, setIsSettingsHide] = useState(true);
  const router = useRouter();
  const { changeTheme, changeHtmlFontSize } = useContext(ThemeChanger);

  function copyRoomCodeToClipboard() {
    typeof roomCode === 'string' && navigator.clipboard.writeText(roomCode);

    toast.success('Room code copied.');
  }

  function handleSettingsHideOrShow() {
    isSettingsHide ? setIsSettingsHide(false) : setIsSettingsHide(true);
  }

  return (
    <Container>
      <header id="top-bar">
        {(roomCode || backButton) && (
          <div>
            <button onClick={() => router.push('/')}>
              <div>
                <FaChevronLeft />
              </div>
              <span>BACK</span>
            </button>
          </div>
        )}

        {roomCode && (
          <div>
            <button
              className="room-code"
              onClick={copyRoomCodeToClipboard}
              title="CLICK TO COPY">
              <div>
                <FaComment />
              </div>
              <span>ROOM CODE:</span>
              <div className="code">{roomCode}</div>
            </button>
          </div>
        )}

        {children}

        <div className="settings-menu-container">
          <button onClick={handleSettingsHideOrShow}>
            <div>
              <BsFillGearFill />
            </div>
            <span>SETTINGS</span>
          </button>
        </div>
      </header>
      {!isSettingsHide && (
        <div className={'settings-content'}>
          <main>
            <div className="group">
              <div>
                <button onClick={() => changeTheme('unicorn')}>
                  <h4>Unicorn Theme</h4>
                  <Unicorn />
                </button>
              </div>

              <div>
                <button onClick={() => changeTheme('reptilian')}>
                  <h4>Reptilian Theme</h4>
                  <Reptilian />
                </button>
              </div>
            </div>

            <div className="group">
              <div>
                <button onClick={() => changeTheme('potato')}>
                  <h4>Potato Theme</h4>
                  <Potato />
                </button>
              </div>

              <div>
                <button onClick={() => changeTheme('dark')}>
                  <h4>Dark Theme</h4>
                  <Dark />
                </button>
              </div>
            </div>

            <div className="group">
              <div>
                <button onClick={() => changeTheme('light')}>
                  <h4>Light Theme</h4>
                  <Light />
                </button>
              </div>

              <div className="settings-small-buttons-container">
                <button onClick={() => changeHtmlFontSize('increase')}>
                  <h4>Increase font</h4>
                </button>

                <button onClick={() => changeHtmlFontSize('decrease')}>
                  <h4>Decrease font</h4>
                </button>

                <button onClick={() => changeTheme('contrast')}>
                  <h4>High contrast</h4>
                </button>
              </div>
            </div>
          </main>
        </div>
      )}
    </Container>
  );
}
