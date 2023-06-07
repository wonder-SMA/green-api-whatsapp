import React, { FC, KeyboardEventHandler, useCallback } from 'react';
import { useActions } from '../../../hooks/use-actions';
import { useTypedSelector } from '../../../hooks/use-typed-selector';
import Conversation from '../conversation';
import EmptyWindow from '../empty-window';
import Sidebar from '../sidebar';
import './chat-window.scss';

const ChatWindow: FC = () => {
  const { currentChat } = useTypedSelector(state => state.userReducer);
  const { exitFromCurrentChat } = useActions();

  // Обработчик нажатия Escape
  const keyDownHandler: KeyboardEventHandler<HTMLDivElement> = useCallback(event => {
    if (event.key === 'Escape') {
      exitFromCurrentChat();
    }
  }, []);

  return (
    <div className="chat-window" onKeyDown={keyDownHandler}>
      <Sidebar />
      {currentChat
        ? <Conversation />
        : <EmptyWindow />
      }
    </div>
  );
};

export default ChatWindow;
