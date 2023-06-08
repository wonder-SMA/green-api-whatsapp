import { FC, useCallback } from 'react';
import { getDateTime } from '../../../helpers/get-date-time';
import { getPhoneNumber } from '../../../helpers/get-phone-number';
import { useActions } from '../../../hooks/use-actions';
import { useTypedSelector } from '../../../hooks/use-typed-selector';
import { TChatId } from '../../../types/chat';
import ChatItem from '../chat-item';
import Button from '../ui/buttons/button';
import './chat-list.scss';

type ChatListProps = {
  isFilter: boolean;
  onResetFilter: () => void;
}

const ChatList: FC<ChatListProps> = ({ isFilter, onResetFilter }) => {
  const { chats, currentChatId } = useTypedSelector(state => state.userReducer);
  const { setCurrentChat } = useActions();

  // Возвращает функцию с замыканием на индекс чата
  const onClickOnChat = useCallback((chatId: TChatId) => {
    return () => setCurrentChat(chatId);
  }, []);

  return (
    <div className="chat-list">
      {Array.from(chats.keys()).length
        ? Array.from(chats.keys()).map(chatId => {
          const chat = chats.get(chatId);

          if (chat) {
            const chatHistoryList = chat.chatHistoryList;
            const chatHistoryMap = chat.chatHistoryMap;
            const lastMessageId = chatHistoryList.last();
            const lastMessage = lastMessageId && chatHistoryMap?.get(lastMessageId);

            return (
              <ChatItem
                className={currentChatId === chatId ? 'current-chat' : ''}
                key={chatId}
                avatar={chat.contactInfo.avatar || ''}
                name={chat.contactInfo?.name || getPhoneNumber(chatId)}
                lastMessage={(lastMessage && lastMessage?.textMessage) || ''}
                time={(lastMessage && lastMessage?.textMessage) ? getDateTime(lastMessage.timestamp) : ''}
                onClick={onClickOnChat(chatId)}
                isUnread={!!chat.unreadMessages.size}
              />
            );
          }
        })
        :
        <div className="chat-list-empty-wrapper">
          <div className="chat-list-empty-content">
            {isFilter ? 'Нет непрочитанных чатов' : 'Нет чатов'}
          </div>
          {isFilter &&
            <Button onClick={onResetFilter}>Сбросить фильтр</Button>
          }
        </div>
      }
    </div>
  );
};

export default ChatList;
