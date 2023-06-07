import React, { FC, useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { compareDatesSame } from '../../../helpers/compare-dates-same';
import { getDateTime } from '../../../helpers/get-date-time';
import { getPhoneNumber } from '../../../helpers/get-phone-number';
import { useActions } from '../../../hooks/use-actions';
import { useTypedSelector } from '../../../hooks/use-typed-selector';
import { TChatInfo, TMessage } from '../../../types/chat';
import { TContactInfo } from '../../../types/contact-info';
import ConversationFooter from '../conversation-footer';
import Header from '../header';
import CloseIcon from '../ui/icons/close-icon';
import Message from '../ui/message';
import TimeMessage from '../ui/time-message';
import './conversation.scss';

const Conversation: FC = () => {
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const { currentChat, chats } = useTypedSelector(state => state.userReducer);
  const { sendMessage, exitFromCurrentChat } = useActions();

  const contactInfo = useMemo(() => {
    if (currentChat) {
      return chats.get(currentChat)?.contactInfo;
    }
  }, [chats, currentChat]);

  // Прокручиваем чат вниз перед отображением
  useLayoutEffect(() => {
    if (messagesRef.current) {
      (messagesRef.current as HTMLDivElement).scrollTop = messagesRef.current.scrollHeight;
    }
  }, [currentChat, chats]);

  // Обработчик отправки сообщений
  const onSend = useCallback((message: string) => {
    sendMessage(message);
  }, []);

  // Обработчик закрытия чата
  const onClose = useCallback(() => exitFromCurrentChat(), []);

  return (
    <div className="conversation">
      <Header
        avatar={(contactInfo as TContactInfo).avatar}
        title="Сведения профиля"
        name={(contactInfo as TContactInfo).name || getPhoneNumber((contactInfo as TContactInfo).chatId)}
        className="conversation__header"
      >
        <CloseIcon className="icon-btn" title="Закрыть чат" onClick={onClose} />
      </Header>
      <div className="conversation__background" />
      <div className="conversation__messages" ref={messagesRef}>
        {currentChat && chats.get(currentChat)?.chatHistoryList.map((messageId, idx, list) => {
          const chatHistoryMap = (chats.get(currentChat) as TChatInfo).chatHistoryMap;

          // Текущее сообщение из списка
          const message = chatHistoryMap.get(messageId) as TMessage;

          // Сообщение после текущего
          const nextMessageId = list.get(idx - 1) as string;
          const nextTimestamp = (chatHistoryMap.get(nextMessageId) as TMessage)?.timestamp;

          // Сравниваем даты текущего и следующего сообщений
          const areDatesSame = compareDatesSame(message.timestamp, nextTimestamp);

          if (message?.idMessage) {

            return (
              <React.Fragment key={message.idMessage}>

                {(idx === 0 || !areDatesSame) &&
                  <TimeMessage>
                    {getDateTime(message.timestamp, 'date')}
                  </TimeMessage>
                }

                <Message
                  time={getDateTime(message.timestamp, 'time')}
                  isMine={message.type === 'outgoing'}
                  status={message.type === 'outgoing' ? message.statusMessage : null}
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
