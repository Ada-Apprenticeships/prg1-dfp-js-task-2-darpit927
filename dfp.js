const fs = require('fs');

function parseFile(indata, outdata, delimiter = ';') {
    if (!fs.existsSync(indata)) {
        return -1;
    }

    if (fs.existsSync(outdata)) {
        fs.unlinkSync(outdata);
    }

    const data = fs.readFileSync(indata, { encoding: 'utf-8' });

    // Split the content into lines
    const lines = data.split(/\n/);

    // Initialize an array to store the processed lines
    const processedLines = [];

    // Loop through each line, skipping the first line (header)
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];

        if (line) {
            // Split the line by the specified delimiter
            const parts = line.split(delimiter);

            // If the line has exactly two parts, process it further
            if (parts.length === 2) {
                // Trim both parts
                let review = parts[0].trim();
                let sentiment = parts[1].trim();

                // Limit review to the first 20 characters
                review = review.slice(0, 20);

                const processedLine = `${sentiment}${delimiter}${review}\n`;
                processedLines.push(processedLine);
            }
        }
    }

    // Write all processed lines to the output file
    fs.writeFileSync(outdata, processedLines.join(''), { encoding: 'utf-8' });

    // Output the count of processed records to console
    console.log(processedLines.length);
    return processedLines.length;
}

// Example usage of the parseFile function
parseFile('./datafile.csv', 'outputfile_test.csv');  // Outputs and returns the number of records processed

// Leave this code here for the automated tests
module.exports = {
  parseFile,
}