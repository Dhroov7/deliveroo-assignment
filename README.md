# Cron Parser

Cron Parser is a command-line application/script that parses a cron string and expands each field to show the times at which it will run.

## Features

- Parses standard cron format with five time fields: minute, hour, day of month, month, and day of week, plus a command.
- Handles wildcard `*`, specific values, intervals, ranges, and lists in cron strings.
- Provides output in a formatted table for easy understanding.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Dhroov7/deliveroo-assignment
```

2. Navigate to the project directory:

```bash
cd deliveroo-assignment
```

3. Install dependencies:

```bash
npm install
```

## Usage

Run the cron parser with a cron string as a single argument:

```bash
npm start "*/15 0 1,15 * 1-5 /usr/bin/find"
```

## Example

Input:
```bash
*/15 0 1,15 * 1-5 /usr/bin/find
```

Output:
```bash
Minutes: 0 15 30 45
Hours: 0
Day of month: 1 15
Month: 1 2 3 4 5 6 7 8 9 10 11 12
Day of Week: 1 2 3 4 5
Command: /usr/bin/find
```

## Tests

To run tests, use the following command:

```bash
npm test
```