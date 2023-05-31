import React, { FC, KeyboardEventHandler, useCallback } from 'react';
import { useActions } from '../../../hooks/use-actions';
import { useTypedSelector } from '../../../hooks/use-typed-selector';
import { UserState } from '../../../store/user/types';
import Conversation from '../conversation';
import EmptyWindow from '../empty-window';
import Sidebar from '../sidebar';
import './chat-window.scss';

type ChatWindowProps = {
  userInfo: UserState['userInfo'];
  contactInfo: UserState['contactInfo'];
}

const ChatWindow: FC<ChatWindowProps> = ({ userInfo, contactInfo }) => {
  const { currentChat, chats } = useTypedSelector(state => state.userReducer);
  const { exitFromCurrentChat } = useActions();

  // Обработчик нажатия Escape
  const keyDownHandler: KeyboardEventHandler<HTMLDivElement> = useCallback(event => {
    if (event.key === 'Escape') {
      exitFromCurrentChat();
    }
  }, []);

  return (
    <div className="chat-window" onKeyDown={keyDownHandler}>
      <Sidebar
        userInfo={userInfo}
        contactInfo={contactInfo}
        chats={chats}
      />
      {currentChat
        ? <Conversation contactInfo={contactInfo} />
        : <EmptyWindow />
      }
    </div>
  );
};

export default ChatWindow;
