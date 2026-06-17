export function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomString(length = 8) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

export function randomLast30DaysRange() {
  const end = new Date();

  const start = new Date();
  start.setDate(end.getDate() - Math.floor(Math.random() * 30));

  return {
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
  };
}
export function randomDateRange(maxDays = 30) {
  const end = new Date();

  const diff = Math.floor(Math.random() * maxDays) + 1;
  // min 1 hari, max 30 hari (lebih realistis)

  const start = new Date();
  start.setDate(end.getDate() - diff);

  return {
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
  };
}
