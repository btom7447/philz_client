// app/admin/utils/groupByMonth.ts
export function groupByMonth(dates: string[], year = new Date().getFullYear()) {
  const months = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(year, i).toLocaleString("default", { month: "short" }),
    count: 0,
  }));

  dates.forEach((dateStr) => {
    const date = new Date(dateStr);
    if (date.getFullYear() === year) {
      months[date.getMonth()].count += 1;
    }
  });

  return months;
}