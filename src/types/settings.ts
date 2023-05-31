import { TChatId } from './chat';

export type TSettings = {
  'wid': TChatId;
  'countryInstance': string;
  'typeAccount': 'trial' | 'production' | 'vip';
  'webhookUrl': string;
  'webhookUrlToken': string;
  'delaySendMessagesMilliseconds': number;
  'markIncomingMessagesReaded': 'yes' | 'no';
  'markIncomingMessagesReadedOnReply': 'yes' | 'no';
  'sharedSession': string;
  'proxyInstance': string;
  'outgoingWebhook': 'yes' | 'no';
  'outgoingMessageWebhook': 'yes' | 'no';
  'outgoingAPIMessageWebhook': 'yes' | 'no';
  'incomingWebhook': 'yes' | 'no';
  'deviceWebhook': 'yes' | 'no';
  'statusInstanceWebhook': 'yes' | 'no';
  'stateWebhook': 'yes' | 'no';
  'enableMessagesHistory': 'yes' | 'no';
  'keepOnlineStatus': 'yes' | 'no';
}
