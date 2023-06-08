import { FC } from 'react';
import classNames from 'classnames';
import UserIcon from '../ui/icons/user-icon';
import './chat-item.scss';

type ChatItemProps = {
  className?: string;
  avatar: string;
  name: string;
  lastMessage: string;
  time: string;
  onClick: () => void;
  isUnread: boolean;
}

const ChatItem: FC<ChatItemProps> = ({
                                       className = '',
                                       avatar,
                                       name,
                                       lastMessage,
                                       time,
                                       onClick,
                                       isUnread,
                                     }) => {

  const chatItemClass = classNames({
    'chat-item': true,
    unread: isUnread,
    [className]: className,
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
      <div className="chat-item__frame">
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
