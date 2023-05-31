import { FC } from 'react';
import IconLayout from '../../../layouts/icon-layout';

type ExitIconProps = {
  className?: string;
  title?: string;
  onClick?: () => void;
}

const ExitIcon: FC<ExitIconProps> = ({ className = '', title = '', onClick }) => {

  return (
    <IconLayout className={className} title={title} onClick={onClick}>
      <span className="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          height="24"
          width="24"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
      </span>
    </IconLayout>
  );
};

export default ExitIcon;
