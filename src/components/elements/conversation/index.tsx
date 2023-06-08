import React, { FC, useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { compareDatesSame } from '../../../helpers/compare-dates-same';
import { getDateTime } from '../../../helpers/get-date-time';
import { getPhoneNumber } from '../../../helpers/get-phone-number';
import { useActions } from '../../../hooks/use-actions';
import { useTypedSelector } from '../../../hooks/use-typed-selector';
import { TMessage } from '../../../types/chat';
import { TContactInfo } from '../../../types/contact-info';
import ConversationFooter from '../conversation-footer';
import Header from '../header';
import CloseIcon from '../ui/icons/close-icon';
import Message from '../ui/message';
import TimeMessage from '../ui/time-message';
import './conversation.scss';

const Conversation: FC = () => {
    const messagesRef = useRef<HTMLDivElement | null>(null);
    const { currentChatId, chats } = useTypedSelector(state => state.userReducer);
    const { sendMessage, setReadMessage, exitFromCurrentChat } = useActions();

    const currentChat = useMemo(() => {
      if (currentChatId) {
        return chats.get(currentChatId);
      }
    }, [currentChatId, chats]);

    // Прокручиваем чат вниз перед отображением при открытии чата
    useLayoutEffect(() => {
      if (messagesRef.current) {
        (messagesRef.current as HTMLDivElement).scrollTop = messagesRef.current.scrollHeight;
      }
    }, [currentChatId]);

    // Прокручиваем чат вниз перед отображением при получении входящего сообщения
    // useLayoutEffect(() => {
    //   const lastMessage = currentChat?.chatHistoryMap.get(currentChat.chatHistoryList.last());
    //
    //   if (messagesRef.current && lastMessage?.type === 'incoming') {
    //     (messagesRef.current as HTMLDivElement).scrollTop = messagesRef.current.scrollHeight;
    //   }
    // }, [currentChat]);

    // Обработчик отправки сообщения
    const onSend = useCallback((message: string) => {
      sendMessage(message);
    }, []);

    // Обработчик прочтения сообщения
    const onRead = useCallback((messageId: TMessage['idMessage']) => {
      if (currentChatId) {
        setReadMessage({ chatId: currentChatId, messageId });
      }
    }, [currentChatId]);

    // Обработчик закрытия чата
    const onClose = useCallback(() => exitFromCurrentChat(), []);

    return (
      <div className="conversation">
        <Header
          avatar={(currentChat?.contactInfo as TContactInfo).avatar || ''}
          title="Сведения профиля"
          name={
            (currentChat?.contactInfo as TContactInfo).name ||
            getPhoneNumber((currentChat?.contactInfo as TContactInfo).chatId)
          }
          className="conversation__header"
        >
          <CloseIcon className="icon-btn" title="Закрыть чат" onClick={onClose} />
        </Header>
        <div className="conversation__background" />
        <div className="conversation__messages" ref={messagesRef}>
          {currentChatId && currentChat?.chatHistoryList.map((messageId, idx, list) => {
            const chatHistoryMap = currentChat.chatHistoryMap;

            // Текущее сообщение из списка
            const message = chatHistoryMap.get(messageId) as TMessage;

            // Сообщение после текущего
            const nextMessageId = list.get(idx - 1) as string;
            const nextTimestamp = (chatHistoryMap.get(nextMessageId) as TMessage)?.timestamp;

            // Сравниваем даты текущего и следующего сообщений
            const areDatesSame = compareDatesSame(message.timestamp, nextTimestamp);

            if (message.idMessage) {

              return (
                <React.Fragment key={message.idMessage}>

                  {(idx === 0 || !areDatesSame) &&
                    <TimeMessage>
                      {getDateTime(message.timestamp, 'date')}
                    </TimeMessage>
                  }

                  <Message
                    messageId={message.idMessage}
                    time={getDateTime(message.timestamp, 'time')}
                    isMine={message.type === 'outgoing'}
                    status={message.type === 'outgoing' ? message.statusMessage : null}
                    isUnread={!!currentChat.unreadMessages.get(message.idMessage)}
                    onRead={onRead}
                  >
                    {message.textMessage}
                  </Message>

                </React.Fragment>
              );
            }
          })}
        </div>
        <ConversationFooter placeholder=" Введите сообщение" onSend={onSend} />
      </div>
    );
  }
;

export default Conversation;
