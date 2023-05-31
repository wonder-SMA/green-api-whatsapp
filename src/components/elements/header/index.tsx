import classNames from 'classnames';
import { FC, PropsWithChildren, ReactNode } from 'react';
import UserIcon from '../ui/icons/user-icon';
import './header.scss';

type HeaderProps = {
  children?: ReactNode;
  avatar? : string;
  title?: string;
  name?: string;
  className?: string;
}

const Header: FC<PropsWithChildren<HeaderProps>> = ({
                                                      children,
                                                      avatar = '',
                                                      title = '',
                                                      name = '',
                                                      className = '',
                                                    }) => {

  const headerClass = classNames({
    header: true,
    [className]: className,
  });

  return (
    <header className={headerClass}>
      <div className="header__user-icon-wrapper">
        <UserIcon className="header__user-icon-content" avatar={avatar} title={title} />
      </div>
      {name &&
        <div className="header__conversation-info">
          <div className="header__chat-name">{name}</div>
        </div>
      }
      <div className="header__menubar">
        {children}
      </div>
    </header>
  );
};

export default Header;
