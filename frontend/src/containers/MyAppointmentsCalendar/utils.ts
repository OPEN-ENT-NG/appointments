export const getDayName = (date: Date, localeCode: string) => {
  const dayName = date.toLocaleDateString(localeCode, { weekday: 'long' });
  return dayName.charAt(0).toUpperCase() + dayName.slice(1);
};

export const getDayNumberAndMonthName = (date: Date, localeCode: string) => {
  const dayNumber = date.getDate();
  const monthName = date.toLocaleDateString(localeCode, { month: 'long' });
  return `${dayNumber} ${monthName}`;
};
