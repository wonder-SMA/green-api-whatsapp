import { TChatId } from '../types/chat';

export const getPhoneNumber = (chatId: TChatId) => `+${parseInt(chatId)}`;
