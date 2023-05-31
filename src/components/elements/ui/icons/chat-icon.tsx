import { FC } from 'react';
import IconLayout from '../../../layouts/icon-layout';

type ChatIconProps = {
  className?: string;
  title?: string;
  onClick?: () => void;
}

const ChatIcon: FC<ChatIconProps> = ({ className = '', title = '', onClick }) => {

  return (
    <IconLayout className={className} title={title}>
      <span className="icon" onClick={onClick}>
        <svg
          viewBox="0 0 24 24"
          height="24"
          width="24"
          preserveAspectRatio="xMidYMid meet"
          version="1.1"
          x="0"
          y="0"
        >
          <path
            fill="currentColor"
            d="M19.005,3.175H4.674C3.642,3.175,3,3.789,3,4.821V21.02 l3.544-3.514h12.461c1.033,0,2.064-1.06,2.064-2.093V4.821C21.068,3.789,20.037,3.175,19.005,3.175z M14.016,13.044H7.041V11.1 h6.975V13.044z M17.016,9.044H7.041V7.1h9.975V9.044z"
          />
        </svg>
      </span>
    </IconLayout>
  );
};

export default ChatIcon;
