import React from 'react';

import { Container } from './styles';

const Console: React.FC = () => {
  return (
    <Container>
      <div id="control-and-console-container">
        {/* <div id="control-container">
          <button>

          </button>
        </div> */}

        <div id="console-container">
          <pre>
            <p>
              <span>@DARTHVADER </span>Hello my friend.
            </p>
            <p>
              <span>@IMTHEROUSER </span>This is a mini-chat message.
            </p>
            <p>
              <span>@DARTHVADER </span>Lorem Ipsum.
            </p>
          </pre>
        </div>
      </div>

      <div id="typing-container">
        <button title="Send to console">◀</button>
        <textarea></textarea>
      </div>
    </Container>
  );
};

export { Console };
