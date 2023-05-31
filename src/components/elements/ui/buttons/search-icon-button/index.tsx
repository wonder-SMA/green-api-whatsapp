import { FC, useCallback } from 'react';
import classNames from 'classnames';
import ArrowIcon from '../../icons/arrow-icon';
import SearchIcon from '../../icons/search-icon';
import './search-icon-button.scss';

type SearchIconButtonProps = {
  isFocus: boolean;
  title?: string;
  onClick: (isFocus: boolean) => void;
}

const SearchIconButton: FC<SearchIconButtonProps> = ({ isFocus, title = '', onClick }) => {

  // Возвращает обработчик нажатия кнопки поиска/отмены поиска с замыканием на соответствующее булево значение
  const clickHandler = useCallback((isFocus: boolean) => {
    return () => onClick(isFocus);
  }, []);

  const arrowIconButtonClass = classNames({
    'arrow-icon-button': true,
    filter: isFocus,
  });

  const searchIconButtonClass = classNames({
    'search-icon-button': true,
    filter: isFocus,
  });

  return (
    <>
      {
        isFocus
          ? <ArrowIcon
            className={arrowIconButtonClass}
            title={title}
            onClick={clickHandler(false)}
          />
          : <SearchIcon
            className={searchIconButtonClass}
            onClick={clickHandler(true)}
          />
      }
    </>
  );
};

export default SearchIconButton;
