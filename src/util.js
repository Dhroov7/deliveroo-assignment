function parseValue(input) {
    return isNaN(parseInt(input)) ? input : parseInt(input);
}

module.exports = { parseValue };