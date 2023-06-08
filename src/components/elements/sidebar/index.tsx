import { FC, useState, useCallback } from 'react';
import { useActions } from '../../../hooks/use-actions';
import { useTypedSelector } from '../../../hooks/use-typed-selector';
import ChatList from '../chat-list';
import Header from '../header';
import FilterIconButton from '../ui/buttons/filter-icon-button';
import ChatIcon from '../ui/icons/chat-icon';
import ExitIcon from '../ui/icons/exit-icon';
import Search from '../ui/search';
import './sidebar.scss';

const Sidebar: FC = () => {
    const [isFilter, setIsFilter] = useState(false);
    const { userInfo } = useTypedSelector(state => state.userReducer);
    const { setNewChat, exitFromAccount } = useActions();

    // Обработчик создания нового чата
    const onClickOnNewChat = useCallback(() => {
      setNewChat(true);
    }, []);

    // Обработчик фильтрации сообщений
    const onFilter = useCallback(() => {
      setIsFilter(prevState => !prevState);
    }, []);

    // Обработчик фильтрации сообщений
    const onExit = useCallback(() => {
      exitFromAccount();
    }, []);

    return (
      <div className="sidebar">
        <Header title="Профиль" avatar={'avatar' in userInfo ? userInfo.avatar : ''}>
          <ChatIcon className="icon-btn" title="Новый чат" onClick={onClickOnNewChat} />
          <ExitIcon className="icon-btn" title="Выйти" onClick={onExit} />
        </Header>
        <div className="sidebar__chat">
          <div className="sidebar__search-wrapper">
            <div className="sidebar__search-content">
              <Search onSearch={() => {}} placeholder="Поиск или новый чат" />
              <FilterIconButton
                isFilter={isFilter}
                title="Меню фильтров чатов"
                className="filter-icon-button"
                onClick={onFilter}
              />
            </div>
          </div>
          <ChatList
            isFilter={isFilter}
            onResetFilter={onFilter}
          />
        </div>
      </div>
    );
  }
;

export default Sidebar;
