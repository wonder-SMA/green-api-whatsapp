import classNames from 'classnames';
import { FC } from 'react';
import UserIcon from '../ui/icons/user-icon';
import './chat-item.scss';

type ChatItemProps = {
  className?: string;
  avatar: string;
  name: string;
  lastMessage: string;
  time: string;
  onClick: () => void;
  isRead: boolean;
}

const ChatItem: FC<ChatItemProps> = ({
                                       className = '',
                                       avatar,
                                       name,
                                       lastMessage,
                                       time,
                                       onClick,
                                       isRead,
                                     }) => {

  const chatItemClass = classNames({
    'chat-item': true,
    [className]: className,
  });

  const chatItemFrameClass = classNames({
    'chat-item__frame': true,
    unread: !isRead,
  });

  return (
    <div className={chatItemClass} onClick={onClick}>
      <div className="chat-item__icon-user-wrapper">
        <UserIcon
          className="chat-item__icon-user-content"
          avatar={avatar}
          title="Профиль"
        />
      </div>
      <div className={chatItemFrameClass}>
        <div className="chat-item__frame-primary">
          <div className="chat-item__title">{name}</div>
          <div className="chat-item__time">{time}</div>
        </div>
        <div className="chat-item__frame-secondary">
          <div className="chat-item__message">{lastMessage}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
