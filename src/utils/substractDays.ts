export const subtractDays = (
  dateInput: string | Date,
  daysToSubtract: number
): string => {
  let date: Date;

  if (dateInput instanceof Date) {
    // Already a Date object
    date = new Date(dateInput);
  } else {
    const parts = dateInput.split("/");
    if (parts.length !== 3) return dateInput; // Invalid format

    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const year = parseInt(parts[2]);

    date = new Date(year < 100 ? 2000 + year : year, month - 1, day);
  }

  // Subtract the given number of days
  date.setDate(date.getDate() - daysToSubtract);

  // Format back to DD/MM/YY or DD/MM/YYYY
  const newDay = date.getDate().toString().padStart(2, "0");
  const newMonth = (date.getMonth() + 1).toString().padStart(2, "0");

  let newYear: string;
  if (dateInput instanceof Date) {
    newYear = date.getFullYear().toString(); // Full year
  } else {
    const originalYear = parseInt(dateInput.split("/")[2]);
    newYear =
      originalYear < 100
        ? date.getFullYear().toString().slice(-2)
        : date.getFullYear().toString();
  }

  return `${newDay}/${newMonth}/${newYear}`;
};
