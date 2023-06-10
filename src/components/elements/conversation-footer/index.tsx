import {
  FC,
  ChangeEventHandler,
  KeyboardEventHandler,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import SendIcon from '../ui/icons/send-icon';
import './conversation-footer.scss';

type ConversationFooterProps = {
  placeholder?: string;
  onSend: (value: string) => void;
}

const ConversationFooter: FC<ConversationFooterProps> = ({ placeholder, onSend }) => {
  const [textareaValue, setTextareaValue] = useState('');
  const footerRef = useRef<HTMLElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current?.focus();
    }
  }, []);

  // Обработчик изменений в поле
  const changeHandler: ChangeEventHandler<HTMLTextAreaElement> = useCallback(event => {
    setTextareaValue(event.target.value);
    changeHeight();
  }, [textareaValue]);

  // Обработчик отправки сообщений
  const sendHandler = useCallback(() => {
    if (textareaValue.split('\n').join('')) {
      onSend(textareaValue);
      setTextareaValue('');
    } else {
      setTextareaValue('');
      (textareaRef.current as HTMLTextAreaElement).style.minHeight = '56px';
      (footerRef.current as HTMLElement).style.minHeight = '72px';
    }
  }, [textareaValue]);

  // Обработчик нажатия клавиши Enter
  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(event => {
    // Обработка отправки сообщения по нажатию Enter
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendHandler();
    }

    // Обработка скролла по нажатию Shift + Enter
    if (event.key === 'Enter' && event.shiftKey) {
      changeHeight();
    }
  }, [textareaValue]);

  // Функция изменения высоты поля и футера в зависимости от заполненности
  const changeHeight = useCallback(() => {
    const textarea = (textareaRef.current as HTMLTextAreaElement);
    textarea.style.minHeight = 'auto';
    textarea.style.minHeight = `${Math.min(136, textarea.scrollHeight)}px`;
    textarea.scrollHeight > 136 ? (textarea.style.overflowY = 'auto') : (textarea.style.overflowY = 'hidden');

    const footer = (footerRef.current as HTMLElement);
    footer.style.minHeight = 'auto';
    footer.style.minHeight = `${Math.min(152, textarea.scrollHeight + 16)}px`;
  }, [footerRef.current, textareaRef.current]);

  return (
    <footer
      ref={footerRef}
      className="conversation-footer"
      onKeyDown={onKeyDown}
    >
      <div />
      <textarea
        ref={textareaRef}
        className="conversation-footer__new-message"
        value={textareaValue}
        placeholder={placeholder}
        onChange={changeHandler}
      />
      <SendIcon className="icon-btn" title="Отправить" onClick={sendHandler} />
    </footer>
  );
};

export default ConversationFooter;
