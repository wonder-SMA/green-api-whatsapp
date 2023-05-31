export const getChatId = (phoneNumber: string) => {

  return phoneNumber.startsWith('+') ? `${phoneNumber.slice(1)}@c.us` : `${phoneNumber}@c.us`;
}
