export const obtainDateFromISODate = (date: string | Date) => {
  if (typeof date === 'string') {
    const formated = new Date(date).toISOString();
    return formated.split('T')[0];
  }

  return date.toISOString().split('T')[0];
};
