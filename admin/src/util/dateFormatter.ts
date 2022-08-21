export function withZero(number: number) {
  if (number < 10) {
    return `0${number}`;
  }
  return `${number}`;
}

export function formatDate(date: Date) {
  let day = withZero(date.getDate());
  let month = withZero(date.getMonth() + 1);
  let year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
