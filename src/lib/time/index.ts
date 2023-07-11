/**
 * - Y: year
 * - W: week
 * - D: day
 * - H: hour
 * - m: minute
 * - s: second
 * - f: millisecond
 */
type TimeUnit = "Y" | "W" | "D" | "H" | "m" | "s" | "f";

/**
 * @example
 * ```ts
 * // three weeks
 * time(3, "W");
 * // six hours
 * time(6, "H");
 * // one year
 * time(1, "Y");
 * ```
 */
export const time = (duration: number, unit: TimeUnit) => {
  switch (unit) {
    // fallthrough hack
    case "Y":
      duration *= 365 / 7;
    case "W":
      duration *= 7;
    case "D":
      duration *= 24;
    case "H":
      duration *= 60;
    case "m":
      duration *= 60;
    case "s":
      duration *= 1000;
    case "f":
      break;
    default:
      throw new Error(
        "Invalid time unit. Must be one of Y (year), W (week), D (day), H (hour), m (minute), s (second), f (millisecond)",
      );
  }
  return duration;
};
