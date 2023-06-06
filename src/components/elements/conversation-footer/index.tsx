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
  const [inputValue, setInputValue] = useState('');
  const footerRef = useRef<HTMLElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, []);

  // Обработчик изменений в поле
  const changeHandler: ChangeEventHandler<HTMLTextAreaElement> = useCallback(event => {
    setInputValue(event.target.value);
  }, [inputValue]);

  // Обработчик отправки сообщений
  const sendHandler = useCallback(() => {
    if (inputValue) {
      onSend(inputValue);
      setInputValue('');
    }
  }, [inputValue]);

  // Обработчик нажатия клавиши Enter
  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(event => {
    const footer = (footerRef.current as HTMLElement);
    const footerRect = footer.getBoundingClientRect();
    const input = (inputRef.current as HTMLTextAreaElement);
    const inputRect = input.getBoundingClientRect();

    // Обработка отправки сообщения по нажатию Enter
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendHandler();
    }
    // Обработка скролла по нажатию Shift + Enter
    if (event.key === 'Enter' && event.shiftKey) {

      if (footerRect.height <= 102) {
        footer.style.minHeight = `${footerRect.height + 20}px`;
        input.style.height = `${inputRect.height + 20}px`;
      } else {
        input.style.overflowY = 'auto';
      }
    }
    //TODO Сделать уменьшение футера и инпута при сокращении кол-ва строк
  }, [inputValue, footerRef.current, inputRef.current]);

  return (
    <footer ref={footerRef} className="conversation-footer" onKeyDown={onKeyDown}>
      <div />
      <textarea
        ref={inputRef}
        className="conversation-footer__new-message"
        value={inputValue}
        placeholder={placeholder}
        onChange={changeHandler}
      />
      <SendIcon className="icon-btn" title="Отправить" onClick={sendHandler} />
    </footer>
  );
};

export default ConversationFooter;
