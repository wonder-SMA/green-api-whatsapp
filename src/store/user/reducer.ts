import { Map } from 'immutable';
import { UserActions, UserActionTypes, UserState } from './types';

const initialState: UserState = {
  isAuth: false,
  credentials: {
    id: null,
    token: null,
  },
  isNewChat: true,
  userSettings: {},
  userInfo: {},
  chats: Map(),
  currentChatId: null,
};

export const userReducer = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {

    case UserActionTypes.SET_AUTH:
      return { ...state, isAuth: action.payload.isAuth };

    case UserActionTypes.SET_CREDENTIALS:
      return { ...state, credentials: { ...action.payload } };

    case UserActionTypes.SET_NEW_CHAT:
      return { ...state, isNewChat: action.payload };

    case UserActionTypes.SET_USER_SETTINGS:
      return { ...state, userSettings: { ...action.payload } };

    case UserActionTypes.SET_USER_INFO:
      return { ...state, userInfo: { ...action.payload } };

    case UserActionTypes.SET_CURRENT_CHAT:
      return { ...state, currentChatId: action.payload };

    case UserActionTypes.SET_UNREAD_MESSAGE:
      const chat = state.chats.get(action.payload.chatId);

      if (chat) {
        // Добавляем сообщение в коллекцию непрочитанных сообщение чата
        const updatedUnreadMessages = chat.unreadMessages.add(action.payload.messageId);

        const updatedChats = state.chats.set(action.payload.chatId, {
          ...chat,
          unreadMessages: updatedUnreadMessages,
        });

        return { ...state, chats: updatedChats };
      }

      return state;

    case UserActionTypes.SET_READ_MESSAGE: {
      const chat = state.chats.get(action.payload.chatId);

      if (chat) {
        // Удаляем сообщение из коллекции непрочитанных сообщение чата
        const updatedUnreadMessages = chat.unreadMessages.delete(action.payload.messageId);

        const updatedChats = state.chats.set(action.payload.chatId, {
          ...chat,
          unreadMessages: updatedUnreadMessages,
        });

        return { ...state, chats: updatedChats };
      }

      return state;
    }

    case UserActionTypes.ADD_CHAT: {
      // Добавляем чат в Map объект чатов
      const updatedChats = state.chats.set(action.payload.contactInfo.chatId, { ...action.payload });

      return { ...state, chats: updatedChats };
    }

    case UserActionTypes.ADD_MESSAGE: {
      const chat = state.chats.get(action.payload.chatId);

      if (chat) {
        const chatHistoryList = chat.chatHistoryList;
        const chatHistoryMap = chat.chatHistoryMap;

        // Добавляем сообщение в список и Map объект истории чата
        const updatedChatHistoryList = chatHistoryList?.push(action.payload.idMessage);
        const updatedChatHistoryMap = chatHistoryMap?.set(action.payload.idMessage, action.payload);

        // Добавляем чат в Map объект чатов
        const updatedChats = state.chats.set(action.payload.chatId, {
          ...chat,
          chatHistoryList: updatedChatHistoryList,
          chatHistoryMap: updatedChatHistoryMap,
        });

        return { ...state, chats: updatedChats };
      }

      return state;
    }

    case UserActionTypes.SET_MESSAGE_STATUS: {
      const chat = state.chats.get(action.payload.chatId);
      const chatHistoryMap = chat?.chatHistoryMap;
      const message = chatHistoryMap?.get(action.payload.messageId);

      if (chat && typeof chatHistoryMap === 'object' && message?.idMessage) {
        // Обновляем статус внутри объекта сообщения и записываем сообщение в историю чата
        const updatedMessage = { ...message, statusMessage: action.payload.status };
        const updatedChatHistoryMap = chatHistoryMap.set(action.payload.messageId, updatedMessage);

        // Добавляем чат в Map объект чатов
        const updatedChats = state.chats.set(action.payload.chatId, {
          ...chat,
          chatHistoryMap: updatedChatHistoryMap,
        });

        return { ...state, chats: updatedChats };
      }

      return state;
    }

    case UserActionTypes.EXIT_FROM_CURRENT_CHAT:
      return { ...state, currentChatId: null };

    case UserActionTypes.EXIT_FROM_ACCOUNT:
      return { ...initialState };

    default:
      return state;
  }
};
