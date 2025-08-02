export const addDays = (
  dateInput: string | Date,
  daysToAdd: number
): string => {
  let date: Date;

  if (dateInput instanceof Date) {
    date = new Date(dateInput);
  } else if (/^\d{2}\/\d{2}\/\d{2,4}$/.test(dateInput)) {
    // DD/MM/YY or DD/MM/YYYY
    const parts = dateInput.split("/");
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const year = parseInt(parts[2]);

    date = new Date(year < 100 ? 2000 + year : year, month - 1, day);
  } else if (!isNaN(Date.parse(dateInput))) {
    // ISO string like "2025-08-01T09:23:15.355Z"
    date = new Date(dateInput);
  } else {
    return dateInput; // Unsupported format
  }

  date.setDate(date.getDate() + daysToAdd);

  const newDay = date.getDate().toString().padStart(2, "0");
  const newMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  const newYear = date.getFullYear().toString();

  return `${newDay}/${newMonth}/${newYear}`;
};
