export function formatEventDate(date: string): string {
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
