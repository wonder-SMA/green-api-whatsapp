import { Map, List } from 'immutable';

export type TChatId = `
  ${number}${number}${number}${number}${number}${number}${number}${number}${number}${number}${number}@c.us
`;

type BaseMessage = {
  idMessage: string;
  timestamp: number;
  typeMessage:
    'textMessage'
    | 'imageMessage'
    | 'videoMessage'
    | 'documentMessage'
    | 'audioMessage'
    | 'locationMessage'
    | 'contactMessage'
    | 'extendedTextMessage'
    | 'quotedMessage';
  chatId: TChatId;
  textMessage: string;
}

type IncomingMessage = {
  type: 'incoming';
  senderId: TChatId;
  senderName: string;
} & BaseMessage;

export type TOutgoingMessage = {
  type: 'outgoing';
  statusMessage: 'pending' | 'sent' | 'delivered' | 'read' | 'failed' | 'noAccount' | 'notInGroup';
  sendByApi: boolean;
} & BaseMessage;

export type TMessage = IncomingMessage | TOutgoingMessage;
export type TChatHistory = {
  chatHistoryList: List<TMessage['idMessage']>;
  chatHistoryMap: Map<BaseMessage['idMessage'], TMessage>;
}

export type TChat = {
  chatId: TChatId;
  chatHistory: TChatHistory;
}

export type TChats = Map<TChatId, TChatHistory>;
