const TIME_FIELDS_VALUES = {
    'week': Array.from({ length: 7 }, (_, i) => i),
    'month': Array.from({ length: 12 }, (_, i) => i + 1),
    'hour': Array.from({ length: 24 }, (_, i) => i),
    'day': Array.from({ length: 31 }, (_, i) => i + 1),
    'minute': Array.from({ length: 60 }, (_, i) => i)
};

const MONTHS = [
    'JAN', 'FEB', 'MAR',
    'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP',
    'OCT', 'NOV', 'DEC'
];

const DAYS = [
    'SUN', 'MON', 'TUE',
    'WED', 'THU', 'FRI',
    'SAT'
];

module.exports = { TIME_FIELDS_VALUES, DAYS, MONTHS };