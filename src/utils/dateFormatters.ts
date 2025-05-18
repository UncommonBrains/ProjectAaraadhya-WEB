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

export const getDateFromISOString = (isoString: string): string => {
  try {
    const dateTime = new Date(isoString);
    // Format as YYYY-MM-DD only
    return `${dateTime.getFullYear().toString().padStart(4, '0')}-${(dateTime.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${dateTime.getDate().toString().padStart(2, '0')}`;
  } catch (e) {
    // If parsing fails, return the original string
    return isoString;
  }
};
