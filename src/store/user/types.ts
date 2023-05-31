import { TChats } from '../../types/chat';
import { TSettings } from '../../types/settings';
import { TCredentials } from '../../types/credentials';
import { TContactInfo } from '../../types/contact-info';
import { TChatId } from '../../types/chat';
import { TMessage, TOutgoingMessage } from '../../types/chat';


export type UserState = {
  isAuth: boolean;
  credentials: {
    id: string | null;
    token: string | null;
  };
  userSettings: TSettings | {};
  userInfo: TContactInfo | {};
  contactInfo: TContactInfo | {};
  chats: TChats;
  currentChat: TChatId | null;
}

export enum UserActionTypes {
  SET_AUTH = 'SET_AUTH',
  SET_CREDENTIALS = 'SET_CREDENTIALS',
  SET_USER_SETTINGS = 'SET_USER_SETTINGS',
  SET_USER_INFO = 'SET_USER_INFO',
  SET_CONTACT_INFO = 'SET_CONTACT_INFO',
  ADD_CHAT = 'ADD_CHAT',
  SET_CURRENT_CHAT = 'SET_CURRENT_CHAT',
  ADD_MESSAGE = 'ADD_MESSAGE',
  SET_MESSAGE_STATUS = 'SET_MESSAGE_STATUS',
  EXIT_FROM_CURRENT_CHAT = 'EXIT_FROM_CURRENT_CHAT',
  EXIT_FROM_ACCOUNT = 'EXIT_FROM_ACCOUNT',
}

export type SetAuthAction = {
  type: UserActionTypes.SET_AUTH;
  payload: {
    isAuth: boolean;
  };
}

export type SetCredentialsAction = {
  type: UserActionTypes.SET_CREDENTIALS;
  payload: TCredentials;
}

export type SetUserSettingsAction = {
  type: UserActionTypes.SET_USER_SETTINGS;
  payload: TSettings;
}

export type SetUserInfoAction = {
  type: UserActionTypes.SET_USER_INFO;
  payload: TContactInfo;
}

export type SetContactInfoAction = {
  type: UserActionTypes.SET_CONTACT_INFO;
  payload: TContactInfo;
}

export type AddChatAction = {
  type: UserActionTypes.ADD_CHAT;
  payload: {
    chatId: TChatId;
    chatHistory: TMessage[];
  };
}

export type SetCurrentChatAction = {
  type: UserActionTypes.SET_CURRENT_CHAT;
  payload: TChatId | null;
}

export type AddMessageAction = {
  type: UserActionTypes.ADD_MESSAGE;
  payload: TMessage;
}

export type SetMessageStatusAction = {
  type: UserActionTypes.SET_MESSAGE_STATUS;
  payload: {
    chatId: TChatId;
    idMessage: string;
    status: TOutgoingMessage['statusMessage'];
  };
}

export type ExitFromCurrentChatAction = {
  type: UserActionTypes.EXIT_FROM_CURRENT_CHAT;
  payload: {};
}

export type ExitFromAccountAction = {
  type: UserActionTypes.EXIT_FROM_ACCOUNT;
  payload: {};
}

export type UserActions =
  SetAuthAction
  | SetCredentialsAction
  | SetUserSettingsAction
  | SetUserInfoAction
  | SetContactInfoAction
  | AddChatAction
  | SetCurrentChatAction
  | AddMessageAction
  | SetMessageStatusAction
  | ExitFromCurrentChatAction
  | ExitFromAccountAction;
