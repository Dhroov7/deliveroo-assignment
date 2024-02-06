const chai = require("chai");
const expect = chai.expect;
const { describeCron } = require("../src/cron-parser");

describe("Cron Parser - ", () => {
  it("#1- should parse a simple cron string", () => {
    const cronStr = "*/15 0 1,15 * 1-5 /usr/bin/find";
    const expectedOutput = `Minutes: 0 15 30 45
Hours: 0
Day of month: 1 15
Month: 1 2 3 4 5 6 7 8 9 10 11 12
Day of Week: 1 2 3 4 5
Command: /usr/bin/find`;
    expect(describeCron(cronStr)).to.equal(expectedOutput);
  });

  it("#2- should handle * wildcard", () => {
    const cronStr = "* * * * * /usr/bin/find";
    const expectedOutput = `Minutes: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59
Hours: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23
Day of month: 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31
Month: 1 2 3 4 5 6 7 8 9 10 11 12
Day of Week: 0 1 2 3 4 5 6
Command: /usr/bin/find`;
    expect(describeCron(cronStr)).to.equal(expectedOutput);
  });

  it("#3- should handle specific values", () => {
    const cronStr = "0 0 1,15 * MON-FRI /usr/bin/find";
    const expectedOutput = `Minutes: 0
Hours: 0
Day of month: 1 15
Month: 1 2 3 4 5 6 7 8 9 10 11 12
Day of Week: 1 2 3 4 5
Command: /usr/bin/find`;
    expect(describeCron(cronStr)).to.equal(expectedOutput);
  });

  it("#4- should handle intervals", () => {
    const cronStr = "5/10 */2 * * * /usr/bin/find";
    const expectedOutput = `Minutes: 10 20 30 40 50
Hours: 0 2 4 6 8 10 12 14 16 18 20 22
Day of month: 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31
Month: 1 2 3 4 5 6 7 8 9 10 11 12
Day of Week: 0 1 2 3 4 5 6
Command: /usr/bin/find`;
    expect(describeCron(cronStr)).to.equal(expectedOutput);
  });

  it("#5- should handle range with DAYS", () => {
    const cronStr = "*/10 */2 * * MON-FRI /usr/bin/find";
    const expectedOutput = `Minutes: 0 10 20 30 40 50
Hours: 0 2 4 6 8 10 12 14 16 18 20 22
Day of month: 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31
Month: 1 2 3 4 5 6 7 8 9 10 11 12
Day of Week: 1 2 3 4 5
Command: /usr/bin/find`;
    expect(describeCron(cronStr)).to.equal(expectedOutput);
  });

  it("#6- should throw an error for invalid week list format of using string with numbers", () => {
    const invalidCronString = "*/15 0 1,15 * 1,2,three,4,5 /usr/bin/find";
    expect(() => describeCron(invalidCronString)).to.throw(
      Error,
      "Invalid week input combination. Please use either string or number syntax."
    );
  });

  it("#7- should throw an error for invalid month range format of using string with numbers", () => {
    const invalidCronString = "*/15 0 1,15 Jan-5 * /usr/bin/find";
    expect(() => describeCron(invalidCronString)).to.throw(
      Error,
      "Invalid month input combination. Please use either string or number syntax."
    );
  });

  it("#8- should handle ? in minutes and return Not Specified", () => {
    const cronStr = "? */2 * * MON-FRI /usr/bin/find";
    const expectedOutput = `Minutes: Not Specified
Hours: 0 2 4 6 8 10 12 14 16 18 20 22
Day of month: 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31
Month: 1 2 3 4 5 6 7 8 9 10 11 12
Day of Week: 1 2 3 4 5
Command: /usr/bin/find`;
    expect(describeCron(cronStr)).to.equal(expectedOutput);
  });
});
