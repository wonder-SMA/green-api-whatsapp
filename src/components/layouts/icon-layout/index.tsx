import { FC, PropsWithChildren, ReactNode } from 'react';
import classNames from 'classnames';
import './icon-layout.scss';

type IconLayoutProps = {
  children?: ReactNode;
  className?: string;
  title?: string;
  onClick?: () => void;
}

const IconLayout: FC<PropsWithChildren<IconLayoutProps>> = ({ children, className = '', title = '', onClick }) => {

  const IconButtonClass = classNames({
    'icon-layout': true,
    [className]: className,
  });

  return (
    <div
      aria-disabled="false"
      role="button"
      tabIndex={0}
      className={IconButtonClass}
      title={title}
      aria-label={title}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default IconLayout;
