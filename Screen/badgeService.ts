
export const parseNotifyDate = (dateStr: string): Date => {
  // "23-12-2025 11:21:13 AM"
  const [datePart, timePart, meridian] = dateStr.split(' ');
  const [day, month, year] = datePart.split('-').map(Number);
  let [hours, minutes, seconds] = timePart.split(':').map(Number);

  if (meridian === 'PM' && hours !== 12) hours += 12;
  if (meridian === 'AM' && hours === 12) hours = 0;

  return new Date(year, month - 1, day, hours, minutes, seconds);
};
