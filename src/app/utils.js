export const isExpired =  (time1, time2) => {
  const secs = (time2 - time1) / 1000;
  const mins = secs / (1000 * 60);
  if (mins <  10) return false;
  else return true;
}