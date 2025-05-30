export const getFormattedDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  
  return date.toLocaleDateString('en-IN', options);
};

export const getFormattedTime = (date: Date): string => {
  return date.toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

export const getDayName = (date: Date): string => {
  return date.toLocaleDateString('en-IN', { weekday: 'short' });
};