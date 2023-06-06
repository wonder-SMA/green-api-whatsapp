import { List, Map } from 'immutable';
import { TChatHistory } from '../../types/chat';
import { UserActions, UserActionTypes, UserState } from './types';

const initialState: UserState = {
  isAuth: false,
  credentials: {
    id: null,
    token: null,
  },
  userSettings: {},
  userInfo: {},
  contactInfo: {},
  chats: Map(),
  currentChat: null,
};

export const userReducer = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {

    case UserActionTypes.SET_AUTH:
      return { ...state, isAuth: action.payload.isAuth };

    case UserActionTypes.SET_CREDENTIALS:
      return { ...state, credentials: { ...action.payload } };

    case UserActionTypes.SET_USER_SETTINGS:
      return { ...state, userSettings: { ...action.payload } };

    case UserActionTypes.SET_USER_INFO:
      return { ...state, userInfo: { ...action.payload } };

    case UserActionTypes.SET_CONTACT_INFO:
      return { ...state, contactInfo: { ...action.payload } };

    case UserActionTypes.SET_CURRENT_CHAT:
      return { ...state, currentChat: action.payload };

    case UserActionTypes.ADD_CHAT: {
      // Создаем список и Map объект истории чата
      const chatHistoryList = List(action.payload.chatHistory.map(msg => msg.idMessage));
      const chatHistoryMap = Map(action.payload.chatHistory.map(msg => [msg.idMessage, msg]));

      // Добавляем чат в Map объект чатов
      const updatedChats = state.chats.set(action.payload.chatId, {
        chatHistoryList,
        chatHistoryMap,
      });

      return { ...state, chats: updatedChats };
    }

    case UserActionTypes.ADD_MESSAGE: {
      const chatId = action.payload.chatId;
      const chatHistoryList = state.chats.get(chatId)?.chatHistoryList;

      if (chatHistoryList?.size) {
        const chatHistoryMap = state.chats.get(chatId)?.chatHistoryMap as TChatHistory['chatHistoryMap'];

        // Добавляем сообщение в список и Map объект истории чата
        const updatedChatHistoryList = chatHistoryList?.push(action.payload.idMessage);
        const updatedChatHistoryMap = chatHistoryMap?.set(action.payload.idMessage, action.payload);

        // Добавляем чат в Map объект чатов
        const updatedChats = state.chats.set(action.payload.chatId, {
          chatHistoryList: updatedChatHistoryList,
          chatHistoryMap: updatedChatHistoryMap,
        });

        return { ...state, chats: updatedChats };
      }

      return state;
    }

    case UserActionTypes.SET_MESSAGE_STATUS: {
      const chatId = action.payload.chatId;
      const chatHistoryMap = state.chats.get(chatId)?.chatHistoryMap;
      const message = chatHistoryMap?.get(action.payload.idMessage);

      if (message?.idMessage) {
        const chatHistoryList = state.chats.get(chatId)?.chatHistoryList as TChatHistory['chatHistoryList'];

        // Обновляем статус внутри объекта сообщения и записываем сообщение в историю чата
        const updatedMessage = { ...message, statusMessage: action.payload.status };
        const updatedChatHistoryMap = chatHistoryMap?.set(action.payload.idMessage, updatedMessage) as TChatHistory['chatHistoryMap'];

        // Добавляем чат в Map объект чатов
        const updatedChats = state.chats.set(action.payload.chatId, {
          chatHistoryList,
          chatHistoryMap: updatedChatHistoryMap,
        });

        return { ...state, chats: updatedChats };
      }

      return state;
    }

    case UserActionTypes.EXIT_FROM_CURRENT_CHAT:
      return { ...state, currentChat: null };

    case UserActionTypes.EXIT_FROM_ACCOUNT:
      return { ...initialState };

    default:
      return state;
  }
};
