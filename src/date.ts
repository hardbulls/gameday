export function toDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function toTimeString(date: Date): string {
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${hour}:${minute}`;
}

export function isDateBeforeToday(date: Date) {
  return new Date(date.toDateString()) < new Date(new Date().toDateString());
}

export function isPastDate(date: Date) {
  return date < new Date();
}

export function convertToGermanDateFormat(dateString: string): string {
  // Ensure the input is in the expected US format YYYY-MM-DD
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!datePattern.test(dateString)) {
    return dateString;
  }

  // Split the date string into components
  const [year, month, day] = dateString.split("-");

  // Construct the German date format DD.MM.YYYY
  return `${day}.${month}.${year}`;
}
