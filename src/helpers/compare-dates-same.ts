export const compareDatesSame = (currentTimestamp: number, nextTimestamp: number) => {
  const currentDateArr = new Date(currentTimestamp * 1000).toDateString();
  const nextDateArr = new Date(nextTimestamp * 1000).toDateString();

  return currentDateArr === nextDateArr;
};
