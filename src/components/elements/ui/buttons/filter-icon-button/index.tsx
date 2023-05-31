import { FC } from 'react';
import classNames from 'classnames';
import IconLayout from '../../../../layouts/icon-layout';
import './filter-icon-button.scss';

type FilterIconButtonProps = {
  isFilter: boolean;
  className?: string;
  title?: string;
  onClick: () => void;
}

const FilterIconButton: FC<FilterIconButtonProps> = ({ isFilter, className = '', title = '', onClick }) => {

  const buttonClass = classNames({
    [className]: className,
    filter: isFilter,
  });

  return (
    <IconLayout className={buttonClass} title={title}>
      <span className="icon" onClick={onClick}>
        <svg
          viewBox="0 0 24 24"
          height="20"
          width="20"
          preserveAspectRatio="xMidYMid meet"
          version="1.1"
          x="0"
          y="0"
        >
          <path fill="currentColor" d="M10,18.1h4v-2h-4V18.1z M3,6.1v2h18v-2H3z M6,13.1h12v-2H6V13.1z" />
        </svg>
      </span>
    </IconLayout>
  );
};

export default FilterIconButton;
