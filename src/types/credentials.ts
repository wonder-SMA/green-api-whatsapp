export type TCredentials = {
  id: string;
  token: string;
}

export type TCredentialsWithPhoneNumber = {
  phoneNumber: string;
} & TCredentials;
