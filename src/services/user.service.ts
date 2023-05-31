import { getChatId } from '../helpers/get-chat-id';
import { TChatId, TMessage } from '../types/chat';
import { TContactInfo } from '../types/contact-info';
import { TCredentials, TCredentialsWithPhoneNumber } from '../types/credentials';
import { TReceivedNotification } from '../types/received-notification';
import { TSettings } from '../types/settings';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const UserService = {
  async getStateInstance({ id, token }: TCredentials): Promise<string> {
    const response = await fetch(API_BASE_URL + `/waInstance${id}/getStateInstance/${token}`);

    if (!response.ok) {
      throw new Error(`${response.status}. ${response.statusText}`);
    } else {
      const { stateInstance } = await response.json();
      return stateInstance;
    }
  },

  async checkWhatsapp({ id, token, phoneNumber }: TCredentialsWithPhoneNumber): Promise<boolean> {
    const response = await fetch(API_BASE_URL + `/waInstance${id}/checkWhatsapp/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber }),
    });

    if (!response.ok) {
      throw new Error(`${response.status}. ${response.statusText}`);
    } else {
      const { existsWhatsapp } = await response.json();
      return existsWhatsapp;
    }
  },

  async getSettings({ id, token }: TCredentials): Promise<TSettings> {
    const response = await fetch(API_BASE_URL + `/waInstance${id}/getSettings/${token}`);

    if (!response.ok) {
      throw new Error(`${response.status}. ${response.statusText}`);
    } else {
      return await response.json();
    }
  },

  async getContactInfo({ id, token, phoneNumber }: TCredentialsWithPhoneNumber): Promise<TContactInfo> {
    const chatId = getChatId(phoneNumber);
    const response = await fetch(API_BASE_URL + `/waInstance${id}/getContactInfo/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatId }),
    });

    if (!response.ok) {
      throw new Error(`${response.status}. ${response.statusText}`);
    } else {
      return await response.json();
    }
  },

  async getChatHistory({ id, token, phoneNumber }: TCredentialsWithPhoneNumber): Promise<TMessage[]> {
    const chatId = getChatId(phoneNumber);
    const response = await fetch(API_BASE_URL + `/waInstance${id}/getChatHistory/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatId }),
    });

    if (!response.ok) {
      throw new Error(`${response.status}. ${response.statusText}`);
    } else {
      return await response.json();
    }
  },

  async sendMessage({
                      id,
                      token,
                      chatId,
                      message,
                    }: TCredentials & { chatId: TChatId, message: string }): Promise<string> {
    const response = await fetch(API_BASE_URL + `/waInstance${id}/sendMessage/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatId, message }),
    });

    if (!response.ok) {
      throw new Error(`${response.status}. ${response.statusText}`);
    } else {
      const { idMessage } = await response.json();
      return idMessage;
    }
  },

  async receiveNotification({ id, token }: TCredentials): Promise<{ receiptId: number, body: TReceivedNotification }> {
    const response = await fetch(API_BASE_URL + `/waInstance${id}/receiveNotification/${token}`);

    if (!response.ok) {
      throw new Error(`${response.status}. ${response.statusText}`);
    } else {
      return await response.json();
    }
  },

  async deleteNotification({
                             id,
                             token,
                             receiptId,
                           }: TCredentials & { receiptId: number }): Promise<{ result: boolean }> {
    const response = await fetch(API_BASE_URL + `/waInstance${id}/deleteNotification/${token}/${receiptId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`${response.status}. ${response.statusText}`);
    } else {
      const data = await response.json();
      return data.result;
    }
  },

  async logout({ id, token }: TCredentials): Promise<boolean> {
    const response = await fetch(API_BASE_URL + `/waInstance${id}/logout/${token}`);

    if (!response.ok) {
      throw new Error(`${response.status}. ${response.statusText}`);
    } else {
      return await response.json();
    }
  },
};
