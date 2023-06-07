import { FC, useState, useCallback, useMemo } from 'react';
import { getDateTime } from '../../../helpers/get-date-time';
import { getPhoneNumber } from '../../../helpers/get-phone-number';
import { useActions } from '../../../hooks/use-actions';
import { useTypedSelector } from '../../../hooks/use-typed-selector';
import { exitFromAccount } from '../../../store/user/actions';
import { TContactInfo } from '../../../types/contact-info';
import { TChatId } from '../../../types/chat';
import ChatItem from '../chat-item';
import Header from '../header';
import Button from '../ui/buttons/button';
import FilterIconButton from '../ui/buttons/filter-icon-button';
import ChatIcon from '../ui/icons/chat-icon';
import ExitIcon from '../ui/icons/exit-icon';
import Search from '../ui/search';
import './sidebar.scss';

const Sidebar: FC = () => {
  const [isFilter, setIsFilter] = useState(false);
  const { chats, currentChat, userInfo } = useTypedSelector(state => state.userReducer);
  const { setNewChat, setCurrentChat, exitFromAccount } = useActions();

  const contactInfo = useMemo(() => {
    if (currentChat) {
      return chats.get(currentChat)?.contactInfo;
    }
  }, [chats, currentChat]);

  // Возвращает функцию с замыканием на индекс чата
  const onClickOnChat = useCallback((chatId: TChatId) => {
    return () => setCurrentChat(chatId);
  }, []);

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
        <div className="sidebar__chat-list">
          {Array.from(chats.keys()).length
            ? Array.from(chats.keys()).map(chatId => {
              const chatHistoryList = chats.get(chatId)?.chatHistoryList;

              if (chatHistoryList?.size) {
                const chatHistoryMap = chats.get(chatId)?.chatHistoryMap;
                const lastMessageId = chatHistoryList.last() as string;
                const lastMessage = chatHistoryMap?.get(lastMessageId);

                return (
                  <ChatItem
                    className={currentChat === chatId ? 'current-chat' : ''}
                    key={chatId}
                    avatar={chats.get(chatId)?.contactInfo.avatar || ''}
                    name={chats.get(chatId)?.contactInfo?.name || getPhoneNumber(chatId)}
                    lastMessage={lastMessage?.textMessage || ''}
                    time={lastMessage?.timestamp ? getDateTime(lastMessage.timestamp) : ''}
                    onClick={onClickOnChat(chatId as TChatId)}
                    isRead={true}
                  />
                );
              }
            })
          :
          <div className="sidebar__chat-list-empty-wrapper">
            <div className="sidebar__chat-list-empty-content">
              {isFilter ? 'Нет непрочитанных чатов' : 'Нет чатов'}
            </div>
            {isFilter &&
              <Button onClick={onFilter}>Сбросить фильтр</Button>
            }
          </div>
          }
        </div>
      </div>
    </div>
  );
}
  ;

  export default Sidebar;
