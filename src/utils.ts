export const formatDate = (date: string | number | undefined): string => {
  const newDate = new Date(date!);
  const formattedDate = newDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return formattedDate;
};
