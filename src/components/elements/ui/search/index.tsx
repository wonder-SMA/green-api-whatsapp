import {
  FC,
  FocusEventHandler,
  ChangeEventHandler,
  KeyboardEventHandler,
  useRef,
  useState,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { useActions } from '../../../../hooks/use-actions';
import SearchIconButton from '../buttons/search-icon-button';
import './search.scss';

type SearchProps = {
  placeholder?: string;
  onSearch: (value: string) => void;
}

const Search: FC<SearchProps> = ({ placeholder = '', onSearch }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { exitFromCurrentChat } = useActions();

  // Обработчик нажатия кнопки поиска
  const onClick = useCallback((isFocus: boolean) => {
    if (isFocus) {
      inputRef.current?.focus();
    }
    setIsFocus(isFocus);
  }, []);

  // Обработчик фокусировки на элементе
  const onFocus: FocusEventHandler<HTMLInputElement> = useCallback(event => {
    setIsFocus(true);
  }, []);

  // Обработчик потери фокусировки на элементе
  const onBlur: FocusEventHandler<HTMLInputElement> = useCallback(event => {
    setIsFocus(false);
  }, []);

  // Обработчик изменений в поле
  const inputHandler: ChangeEventHandler<HTMLInputElement> = useCallback(event => {
    setInputValue(event.target.value);
  }, []);

  // Обработчик нажатия Enter и Escape
  const keyDownHandler: KeyboardEventHandler<HTMLInputElement> = useCallback(event => {
    if (event.key === 'Enter') {
      onSearch(inputValue);
    }
    if (event.key === 'Escape') {
      exitFromCurrentChat();
      inputRef.current?.blur();
    }
  }, []);

  const searchClass = classNames({
    'search__input': true,
    focus: isFocus,
  });

  return (
    <div className="search">
      <SearchIconButton isFocus={isFocus} onClick={onClick} />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={inputHandler}
        onKeyDown={keyDownHandler}
        className={searchClass}
      />
    </div>
  );
};

export default Search;
