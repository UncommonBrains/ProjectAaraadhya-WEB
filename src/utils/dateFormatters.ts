import moment from 'moment';

export const formatTimeString = (timeStr?: string) => {
  if (timeStr) {
    // Ensure both hour and minute are two-digit
    const [hourStr, minuteStr] = timeStr.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    // Create moment object and format
    const formatted = moment({ hour, minute }).format('h:mm A');
    return formatted;
  }
};
