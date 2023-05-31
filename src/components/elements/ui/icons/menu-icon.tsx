import { FC } from 'react';
import IconLayout from '../../../layouts/icon-layout';

type MenuIconProps = {
  className?: string;
  title?: string;
  onClick?: () => void;
}

const MenuIcon: FC<MenuIconProps> = ({ className = '', title = '', onClick }) => {

  return (
    <IconLayout className={className} title={title}>
      <span className="icon" onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          height="24"
          width="24"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </span>
    </IconLayout>
  );
};

export default MenuIcon;
