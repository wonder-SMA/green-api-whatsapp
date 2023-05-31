export const getDateTime = (timestamp: number, type?: 'time' | 'date') => {
  const dateObject = new Date(timestamp * 1000);

  switch (type) {
    case 'time':
      return dateObject.toLocaleString().slice(12, -3);
    case 'date':
      return dateObject.toLocaleString().slice(0, -10);
    default:
      return dateObject.toLocaleString().slice(0, -3);
  }
};
