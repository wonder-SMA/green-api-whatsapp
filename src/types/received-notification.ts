import { TChatId } from './chat';

export type TTextMessageData = {
  textMessageData: {
    textMessage: string;
  }
}

export type TExtendedTextMessageData = {
  extendedTextMessageData: {
    text: string;
    description: string;
    title: string;
    previewType: string;
    jpegThumbnail: string;
  }
}


type MessageData = {
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
} & (TTextMessageData | TExtendedTextMessageData)

export type TBaseMessageReceived = {
  instanceData: {
    idInstance: number;
    wid: string;
    typeInstance: string;
  };
  timestamp: number;
  idMessage: string;
  senderData: {
    chatId: TChatId
    sender: TChatId
    chatName: string;
    senderName: string;
  };
  messageData: MessageData;
}

export type TIncomingMessageReceived = {
  typeWebhook: 'incomingMessageReceived';
} & TBaseMessageReceived;

export type TOutgoingMessageReceived = {
  typeWebhook: 'outgoingMessageReceived';
} & TBaseMessageReceived;

export type TOutgoingAPIMessageReceived = {
  typeWebhook: 'outgoingAPIMessageReceived';
} & TBaseMessageReceived;

export type TOutgoingMessageStatus = {
  typeWebhook: 'outgoingMessageStatus';
  chatId: TChatId;
  instanceData: {
    idInstance: number;
    wid: string;
    typeInstance: string;
  };
  timestamp: number;
  idMessage: string;
  status: 'pending' | 'sent' | 'delivered' | 'read' | 'failed' | 'noAccount' | 'notInGroup';
  sendByApi: boolean;
}

export type TReceivedNotification =
  TIncomingMessageReceived
  | TOutgoingMessageReceived
  | TOutgoingAPIMessageReceived
  | TOutgoingMessageStatus;
