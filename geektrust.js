const fs = require('fs');
const { default: metroCardService } = require('./dist/src');

const filename = process.argv[2];

fs.readFile(filename, 'utf8', (err, data) => {
  if (err) throw err;
  const inputLines = data.toString().split('\n');
  inputLines.forEach((line) => {
    line = line.trim();
    const [command, arg1, arg2, arg3] = line.split(' ');
    switch (command) {
      case 'BALANCE':
        metroCardService.registerCard(arg1, arg2);
        break;
      case 'CHECK_IN':
        metroCardService.checkIn(arg1, arg2, arg3);
        break;
      case 'PRINT_SUMMARY':
        metroCardService.printSummary();
        break;
      default:
        console.log('\x1b[31mInvalid command\x1b[0m');
    }
  });
});
