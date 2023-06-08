import { FC, PropsWithChildren, ReactNode, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { TMessage } from '../../../../types/chat';
import CheckIcon from '../icons/check-icon';
import './message.scss';

type MessageProps = {
  children: ReactNode;
  messageId: TMessage['idMessage'];
  time: string;
  isMine: boolean;
  status: 'pending' | 'sent' | 'delivered' | 'read' | 'failed' | 'noAccount' | 'notInGroup' | null;
  isUnread: boolean;
  onRead: (messageId: TMessage['idMessage']) => void;
}

const Message: FC<PropsWithChildren<MessageProps>> = ({
                                                        children,
                                                        messageId,
                                                        time,
                                                        isMine,
                                                        status,
                                                        isUnread,
                                                        onRead,
                                                      }) => {
  const messageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isUnread && messageRef.current) {
      const observer = new IntersectionObserver(
        ([entry], observer) => {
          // проверяем что непрочитанное сообщение находится в поле зрения
          if (entry.isIntersecting) {
            // перестаем его отслеживать
            observer.unobserve(entry.target);
            // Помечаем как прочитанное
            onRead(messageId);
          }
        },
        { threshold: 0.9 },
      );
      observer.observe(messageRef.current);
    }
  }, []);

  const messageClass = classNames({
    message: true,
    'message-mine': isMine,
  });

  const messageBodyMetaClass = classNames({
    'message__body-meta': true,
    read: status === 'read',
  });

  return (
    <div className={messageClass} ref={messageRef}>
      <div className="message__body-wrapper">
        <div className="message__body-content">
          {children}
          <div className="message__body-text">
          </div>
          <div className={messageBodyMetaClass}>
            {time}
            {status &&
              <CheckIcon className="message__body-meta-check" status={status} />
            }
          </div>
        </div>
        {isMine
          ? <span className="message__tail-out">
              <svg
                viewBox="0 0 8 13"
                height="13"
                width="8"
                preserveAspectRatio="xMidYMid meet"
                version="1.1"
                x="0"
                y="0"
              >
                <path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z" />
                <path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z" />
              </svg>
            </span>
          : <span className="message__tail-in">
              <svg
                viewBox="0 0 8 13"
                height="13"
                width="8"
                preserveAspectRatio="xMidYMid meet"
                className=""
                version="1.1"
                x="0"
                y="0"
              >
                <path
                  opacity="0.13"
                  fill="#0000000"
                  d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"
                />
                <path
                  fill="currentColor"
                  d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"
                />
              </svg>
            </span>
        }
      </div>
    </div>
  );
};

export default Message;
