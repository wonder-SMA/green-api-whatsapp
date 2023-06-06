import { FC } from 'react';
import IconLayout from '../../../layouts/icon-layout';

type SendIconProps = {
  className?: string;
  title?: string;
  onClick?: () => void;
}

const SendIcon: FC<SendIconProps> = ({ className = '', title = '', onClick }) => {

  return (
    <IconLayout className={className} title={title}>
      <span className="icon" onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </span>
    </IconLayout>
  );
};

export default SendIcon;
