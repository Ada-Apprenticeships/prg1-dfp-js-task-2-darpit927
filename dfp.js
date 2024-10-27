const fs = require('fs');

function parseFile(indata, outdata, delimiter = ';') {
    if (!fs.existsSync(indata)) {
        console.error(`Input file does not exist: ${indata}`);
        return -1;
    }

    if (fs.existsSync(outdata)) {
        fs.unlinkSync(outdata);
    }

    const data = fs.readFileSync(indata, 'utf-8');
    const processedLines = data.split(/\n/)
        .slice(1) // Skip the header
        .filter(line => line) // Remove empty lines
        .map(line => {
            const [review, sentiment] = line.split(delimiter).map(part => part.trim());
            return (review && sentiment) ? `${sentiment}${delimiter}${review.slice(0, 20)}\n` : null;
        })
        .filter(Boolean); // Remove null entries

    fs.writeFileSync(outdata, processedLines.join(''), 'utf-8');
    console.log(`Processed ${processedLines.length} records.`);
    return processedLines.length;
}

// Example usage of the parseFile function
parseFile('./datafile.csv', 'outputfile_test.csv');  // Outputs and returns the number of records processed

// Leave this code here for the automated tests
module.exports = {
  parseFile,
}