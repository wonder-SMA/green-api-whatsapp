import React, { FC } from 'react';
import IntroIcon from '../ui/icons/intro-icon';
import './empty-window.scss';

const EmptyWindow: FC = () => {
  return (
    <div className="empty-window">
      <div className="empty-window__intro">
        <div className="empty-window__intro-image">
          <IntroIcon />
        </div>
        <div className="empty-window__intro-msg">
          <h1 className="empty-window__intro-title">
            WhatsApp Web
          </h1>
          <div className="empty-window__intro-text">
            Отправляйте и&nbsp;получайте сообщения без необходимости оставлять телефон подключённым.
            <br />
            Используйте WhatsApp одновременно на&nbsp;четырёх связанных устройствах и&nbsp;одном телефоне.
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyWindow;
