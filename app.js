const csv = require('csv-parser');  
const fs = require('fs');

fs.createReadStream('emojis.csv')  
  .pipe(csv())
  .on('data', (row) => {
    console.log(JSON.stringify(row));
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

  