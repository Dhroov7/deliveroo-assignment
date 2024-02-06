const { DAYS, MONTHS, TIME_FIELDS_VALUES } = require("./constant");
const { parseValue } = require("./util");

function defineString(string, timeField) {
  if (string === "*") {
    return TIME_FIELDS_VALUES[timeField].join(" ");
  }

  if (string === "?") {
    return "Not Specified";
  }

  if (string.includes("-")) {
    return handleRange(string, timeField);
  }

  if (string.includes("/")) {
    return handleIntervals(string, timeField);
  }

  if (string.includes(",")) {
    return handleLists(string, timeField);
  }

  return string;
}

function handleRange(range, timeFieldType) {
  const [start, end] = range.split("-"),
    timeFieldRange = TIME_FIELDS_VALUES[timeFieldType];

  const startVal = parseInt(start),
    endVal = parseInt(end);

  //Check if the range is given as Names. Example: Mon-Fri
  if (isNaN(startVal) || isNaN(endVal)) {
    const startIndex =
      timeFieldType === "week" ? DAYS.indexOf(start) : MONTHS.indexOf(start);
    const endIndex =
      timeFieldType === "week" ? DAYS.indexOf(end) : MONTHS.indexOf(end);

    if (startIndex < 0 || endIndex < 0) {
      throw new Error(
        `Invalid ${timeFieldType} input combination. Please use either string or number syntax.`
      );
    }

    return timeFieldRange.slice(startIndex, endIndex + 1).join(" ");
  }

  return Array.from(
    { length: endVal - startVal + 1 },
    (_, i) => i + startVal
  ).join(" ");
}

function handleIntervals(interval, timeFieldType) {
  const [first, second] = interval.split("/"),
    timeFieldRange = TIME_FIELDS_VALUES[timeFieldType];
  const step = parseInt(second);

  if (first === "*") {
    //return every possible step value from the range.
    return timeFieldRange.filter((i) => i % step === 0).join(" ");
  }

  const startVal = parseInt(first);

  if (isNaN(startVal) || isNaN(step)) {
    throw new Error(`Invalid input for ${datatype}`);
  }

  return timeFieldRange
    .filter((i) => i >= startVal && i % step === 0)
    .join(" ");
}

function handleLists(list, timeFieldType) {
  const inputs = list.split(",");
  const subArray = getSubArray(timeFieldType);
  let initialValueType = null;

  for (const input of inputs) {
    const currentValue = parseValue(input);
    const currentValueType = typeof currentValue;

    if (!initialValueType) {
      initialValueType = currentValueType;
    } else if (currentValueType !== initialValueType) {
      throw new Error(
        `Invalid ${timeFieldType} input combination. Please use either string or number syntax.`
      );
    }

    if (
      currentValueType === "string" &&
      subArray.length > 0 &&
      !subArray.includes(currentValue)
    ) {
      throw new Error(`Invalid ${timeFieldType} data provided`);
    }

    if (
      currentValueType === "number" &&
      !TIME_FIELDS_VALUES[timeFieldType].includes(currentValue)
    ) {
      throw new Error(`Invalid ${timeFieldType} data provided`);
    }
  }

  return list.replace(",", " ");
}

function getSubArray(timeFieldType) {
  return timeFieldType === "week" || timeFieldType === "month"
    ? timeFieldType === "week"
      ? DAYS
      : MONTHS
    : [];
}

function describeCron(cronStr) {
  const [minute, hour, day, month, week, cmd] = cronStr.split(" ");

  return [
    `Minutes: ${defineString(minute, "minute")}`,
    `Hours: ${defineString(hour, "hour")}`,
    `Day of month: ${defineString(day, "day")}`,
    `Month: ${defineString(month, "month")}`,
    `Day of Week: ${defineString(week, "week")}`,
    `Command: ${cmd}`,
  ].join("\n");
}

module.exports = {
  describeCron,
};
