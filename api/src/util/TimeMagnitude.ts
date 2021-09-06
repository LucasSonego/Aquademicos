class TimeMagnitude {
  toMilliseconds(timeString: string) {
    const [time, unit] = timeString.match(/[a-zA-Z]+|[0-9]+/g);

    if (unit == "s") {
      return parseInt(time) * 1000;
    }
    if (unit == "m") {
      return parseInt(time) * 1000 * 60;
    }
    if (unit == "h") {
      return parseInt(time) * 1000 * 60 * 60;
    }
    if (unit == "d") {
      return parseInt(time) * 1000 * 60 * 60 * 24;
    }
  }
}

export default new TimeMagnitude();
