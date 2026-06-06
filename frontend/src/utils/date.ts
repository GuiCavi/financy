export const isCurrentMonthAndYear = (date: string) => {
  const transactionDate = new Date(date);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
};
