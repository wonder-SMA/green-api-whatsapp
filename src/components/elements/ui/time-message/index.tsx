import { FC, PropsWithChildren, ReactNode } from 'react';
import './time-message.scss';

type TimeMessageProps = {
  children: ReactNode;
}

const TimeMessage: FC<PropsWithChildren<TimeMessageProps>> = ({ children }) => {

  return (
    <div className="time-message">
      <div className="time-message__body-wrapper">
        <div className="time-message__body-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TimeMessage;
