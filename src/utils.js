export const dateToFormatString = (date) =>
  new Intl.DateTimeFormat(`en-US`, {
    year: `numeric`,
    month: `long`,
    day: `numeric`,
  }).format(date);

export const sortByDate = (array) => {
  return array.slice().sort((a, b) => (b.date) - (a.date));
};
