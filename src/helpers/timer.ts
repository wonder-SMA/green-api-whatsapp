export const timer = (callback: () => void, delay: number) => {
  const startTime = Date.now();
  let currentTime = 0;
  // Компенсация смещения времени из-за неточности функции setTimeout
  const timeOffset = (Date.now() - startTime) - currentTime * 1000;

  const timedId = setTimeout(() => {
    currentTime += 1;
    clearTimeout(timedId);
    callback();
  }, Math.max(delay - timeOffset, 0));
};
