import { FC } from 'react';
import IconLayout from '../../../layouts/icon-layout';

type CloseIconProps = {
  className?: string;
  title?: string;
  onClick?: () => void;
}

const CloseIcon: FC<CloseIconProps> = ({ className = '', title = '', onClick }) => {

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
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    </IconLayout>
  );
};

export default CloseIcon;
