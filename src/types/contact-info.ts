import { TChatId } from './chat';

export type Product = {
  id: string;
  imageUrls: {
    'requested': string;
    'original': string;
  };
  availability: string;
  reviewStatus: {
    whatsapp: string;
  };
  name: string;
  description: string;
  price: string | null;
  isHidden: boolean;
}

export type TContactInfo = {
  avatar: string;
  name: string;
  email: string;
  category: string;
  description: string;
  products: Product[],
  chatId: TChatId;
  lastSeen: string | null;
  isArchive: boolean;
  isDisappearing: boolean;
  isMute: boolean;
  messageExpiration?: number;
  muteExpiration: number | null;
}
