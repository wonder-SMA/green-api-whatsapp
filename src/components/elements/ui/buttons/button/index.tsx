import { FC, PropsWithChildren, useCallback } from 'react';
import classNames from 'classnames';
import './button.scss';

type ButtonProps = {
  children?: string;
  className?: string;
  ariaLabel?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
                                                      children,
                                                      className = '',
                                                      ariaLabel,
                                                      type = 'button',
                                                      onClick = () => {},
                                                    }) => {
  const buttonClass = classNames({
    button: true,
    [className]: className,
  });

  const clickHandler = useCallback(() => onClick(), []);

  return (
    <button
      className={buttonClass}
      aria-label={ariaLabel}
      type={type}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};

export default Button;
