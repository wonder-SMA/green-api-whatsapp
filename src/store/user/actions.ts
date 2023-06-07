import { toast } from 'react-toastify';
import { getPhoneNumber } from '../../helpers/get-phone-number';
import { timer } from '../../helpers/timer';
import { UserService } from '../../services/user.service';
import { TChatId } from '../../types/chat';
import { TCredentials } from '../../types/credentials';
import {
  TTextMessageData,
  TOutgoingMessageStatus,
  TOutgoingMessageReceived,
  TIncomingMessageReceived,
  TExtendedTextMessageData,
  TOutgoingAPIMessageReceived,
} from '../../types/received-notification';
import { TAppDispatch, TRootState } from '../index';
import { SetCurrentChatAction, UserActionTypes } from './types';

export const setAuth = (credentials: TCredentials) => {
  return async (dispatch: TAppDispatch, getState: () => TRootState) => {
    try {
      // Авторизация и сохранение состояния авторизации с данными в стор
      const stateInstance = await UserService.getStateInstance(credentials);

      switch (stateInstance) {
        case 'authorized':
          toast.success('Аккаунт авторизован');

          dispatch({ type: UserActionTypes.SET_AUTH, payload: { isAuth: true } });
          dispatch({ type: UserActionTypes.SET_CREDENTIALS, payload: credentials });

          // Запрос настроек отправителя и сохранение ее в стор
          const settings = await UserService.getSettings(credentials);
          dispatch({ type: UserActionTypes.SET_USER_SETTINGS, payload: settings });

          // Запрос информации об отправителе и сохранение ее в стор
          const phoneNumber = getPhoneNumber(settings.wid);
          const userInfo = await UserService.getContactInfo({ ...credentials, phoneNumber });
          dispatch({ type: UserActionTypes.SET_USER_INFO, payload: userInfo });

          // Запуск обработки очереди входящих уведомлений
          await handleMsgReceivedNotifications()(dispatch, getState);

          break;

        case 'notAuthorized':
          toast.success('Аккаунт не авторизован');
          break;

        case 'blocked':
          toast.success('Аккаунт забанен');
          break;

        case 'sleepMode':
          toast.success('Аккаунт ушел в спящий режим');
          break;

        case 'starting':
          toast.success('Аккаунт в процессе запуска');
          break;

        default:
          break;

      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
};

export const setNewChat = (payload: boolean) => {
  return { type: UserActionTypes.SET_NEW_CHAT, payload };
};

export const createChat = (phoneNumber: string) => {
  return async (dispatch: TAppDispatch, getState: () => TRootState) => {
    try {
      const credentials = getState().userReducer.credentials as TCredentials;

      // Запрос информации о наличии Whatsapp у пользователя
      const existsWhatsapp = await UserService.checkWhatsapp({ ...credentials, phoneNumber });

      if (existsWhatsapp) {
        // Запрос информации о получателе
        const contactInfo = await UserService.getContactInfo({ ...credentials, phoneNumber });

        // Запрос истории чата между отправителем и получателя
        const chatHistory = await UserService.getChatHistory({ ...credentials, phoneNumber });

        // Сохранение в стор информации о получателе и истории чата
        dispatch({
          type: UserActionTypes.ADD_CHAT,
          payload: {
            chatId: contactInfo.chatId,
            contactInfo,
            chatHistory: chatHistory.slice(0).reverse(),
          },
        });

        // Закрытие модального окна нового чата
        dispatch({
          type: UserActionTypes.SET_NEW_CHAT,
          payload: false,
        });

      } else {
        toast.error('Пользователь не зарегистрирован в WhatsApp');
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
};

export const sendMessage = (message: string) => {
  return async (dispatch: TAppDispatch, getState: () => TRootState) => {
    try {
      const credentials = getState().userReducer.credentials as TCredentials;
      const chatId = getState().userReducer.currentChat as TChatId;

      // Запрос на отправку сообщения
      await UserService.sendMessage({
        ...credentials,
        chatId,
        message,
      });
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
};

export const setCurrentChat = (payload: SetCurrentChatAction['payload']) => {
  return { type: UserActionTypes.SET_CURRENT_CHAT, payload };
};

export const exitFromCurrentChat = (payload = {}) => {
  return { type: UserActionTypes.EXIT_FROM_CURRENT_CHAT, payload };
};

export const exitFromAccount = (payload = {}) => {
  return async (dispatch: TAppDispatch, getState: () => TRootState) => {
    try {
      const credentials = getState().userReducer.credentials as TCredentials;

      // Выход
      const isLogout = await UserService.logout(credentials);

      if (isLogout) {
        toast.success('Сессия аккаунта завершена');
        dispatch({ type: UserActionTypes.EXIT_FROM_ACCOUNT, payload });
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
};

export const handleMsgReceivedNotifications = () => {
  return async (dispatch: TAppDispatch, getState: () => TRootState) => {

    try {
      const credentials = getState().userReducer.credentials as TCredentials;
      let notification;

      if (credentials.id && credentials.token) {
        notification = await UserService.receiveNotification(credentials);
      }

      if (notification?.receiptId) {

        if (['outgoingMessageReceived', 'outgoingAPIMessageReceived'].includes(notification.body.typeWebhook)) {

          const outgoingMsgReceived = notification.body as TOutgoingMessageReceived | TOutgoingAPIMessageReceived;
          const textMessage = notification.body.typeWebhook === 'outgoingMessageReceived'
            ? (outgoingMsgReceived.messageData as TTextMessageData).textMessageData.textMessage
            : (outgoingMsgReceived.messageData as TExtendedTextMessageData).extendedTextMessageData.text;

          dispatch({
            type: UserActionTypes.ADD_MESSAGE, payload: {
              type: 'outgoing',
              idMessage: outgoingMsgReceived.idMessage,
              timestamp: outgoingMsgReceived.timestamp,
              typeMessage: outgoingMsgReceived.messageData.typeMessage,
              chatId: outgoingMsgReceived.senderData.chatId,
              textMessage,
              statusMessage: 'pending',
              sendByApi: true,
            },
          });

        } else if (notification.body.typeWebhook === 'outgoingMessageStatus') {

          const outgoingMsgReceived = notification.body as TOutgoingMessageStatus;

          dispatch({
            type: UserActionTypes.SET_MESSAGE_STATUS,
            payload: {
              chatId: outgoingMsgReceived.chatId,
              idMessage: outgoingMsgReceived.idMessage,
              status: outgoingMsgReceived.status,
            },
          });

        } else if (notification.body.typeWebhook === 'incomingMessageReceived') {

          const incomingMsgReceived = notification.body as TIncomingMessageReceived;

          dispatch({
            type: UserActionTypes.ADD_MESSAGE, payload: {
              type: 'incoming',
              idMessage: incomingMsgReceived.idMessage,
              timestamp: incomingMsgReceived.timestamp,
              typeMessage: incomingMsgReceived.messageData.typeMessage,
              chatId: incomingMsgReceived.senderData.chatId,
              textMessage: (incomingMsgReceived.messageData as TTextMessageData).textMessageData.textMessage,
              senderId: incomingMsgReceived.senderData.sender,
              senderName: incomingMsgReceived.senderData.senderName,
            },
          });
        }

        await UserService.deleteNotification({ ...credentials, receiptId: notification.receiptId });
      }

      if (credentials.id && credentials.token) {
        timer(() => handleMsgReceivedNotifications()(dispatch, getState), 0);
      }

    } catch (error) {
      toast.error((error as Error).message);
    }
  };
};
