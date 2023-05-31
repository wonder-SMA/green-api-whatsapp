import { FC, FormEvent, PropsWithChildren, ReactNode, useEffect, useRef } from 'react';
import classNames from 'classnames';
import './modal.scss';

type ModalProps = {
  className?: string;
  heading?: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children?: ReactNode;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({ className = '', onSubmit, heading = '', children }) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  // Фокусируемся на первое поле после монтирования формы
  useEffect(() => {
    formRef.current?.getElementsByTagName('input')[0].focus();
  }, []);

  const modalClass = classNames({
    'modal': true,
    [className]: className,
  });

  return (
    <div className={modalClass}>
      <div className="modal__content">
        <div className="modal__header">
          <h3 className="modal__heading">{heading}</h3>
        </div>
        <div className="modal__body">
          <form ref={formRef} className="modal__form" onSubmit={onSubmit}>
            {children}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
