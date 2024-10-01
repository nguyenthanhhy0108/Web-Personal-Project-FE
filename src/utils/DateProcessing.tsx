interface DateObject {
  year: number;
  month: number;
  day: number;
}

export const formatDateToString = (dateObj: DateObject): string => {
  const { year, month, day } = dateObj;

  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');

  return `${year}-${formattedMonth}-${formattedDay}`;
};
