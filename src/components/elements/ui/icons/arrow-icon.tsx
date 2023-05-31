import { FC } from 'react';
import IconLayout from '../../../layouts/icon-layout';

type ArrowIconProps = {
  className?: string;
  title?: string;
  onClick?: () => void;
}

const ArrowIcon: FC<ArrowIconProps> = ({ className = '', title = '', onClick }) => {

  return (
    <IconLayout className={className} title={title}>
      <span className="icon" onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          height="24"
          width="24"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
        </svg>
      </span>
    </IconLayout>
  );
};

export default ArrowIcon;
