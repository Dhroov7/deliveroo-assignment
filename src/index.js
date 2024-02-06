const { describeCron } = require('./cron-parser');

function main() {
    const argv = process.argv;
    if (argv.length < 3) {
        console.error('Invalid number of input in CRON command');
        return;
    }
    const cronStr = argv[2];
    console.log(describeCron(cronStr));
}

main();
