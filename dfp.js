const fs = require('fs');

// Function to parse and process the input file
function parseFile(indata, outdata, delimiter = ';') {
    // Step 1: Check if input file exists, return -1 if it does not
    if (!fs.existsSync(indata)) {
        return -1;
    }

    // Step 2: Delete output file if it exists
    if (fs.existsSync(outdata)) {
        fs.unlinkSync(outdata);
    }

    // Step 3: Open source file in read-only mode with correct encoding
    const data = fs.readFileSync(indata, { encoding: 'utf-8' });

    // Split the data into lines
    const lines = data.split(/\n/);

    // Initialize an array to hold processed lines
    const processedLines = [];

    // Step 4: Process each line, ignore the first row (header)
    for (let i = 1; i < lines.length; i++) {
        let line = lines[i]; // Remove whitespace from the current line

        if (line) {
            // Step 5: Split by the provided delimiter (default is ';')
            const parts = line.split(delimiter);

            if (parts.length === 2) {
                // Trim each part
                let review = parts[0].trim();
                let sentiment = parts[1].trim();

                // Step 6: Trim review to 20 characters
                review = review.slice(0, 20);

                // Step 7: Reverse the order and join with delimiter (sentiment first)
                const processedLine = `${sentiment}${delimiter}${review}\n`;
                processedLines.push(processedLine);
            }
        }
    }

    // Write processed lines to the output file
    fs.writeFileSync(outdata, processedLines.join(''), { encoding: 'utf-8' });

    // Return the total number of records exported (excluding the header)
    console.log(processedLines.length);
    return processedLines.length;
}


// Example usage
parseFile('./datafile.csv', 'outputfile_test.csv');  // Should return the number of records processed
// console.log(parseFile('./doesnotexist.csv', './testing/outputfile_test.csv'));  // Should return -1 for a non-existent file
// parseFile('./datafile.csv', './testing/outputfile_test.csv', ',');  // Example with a different delimiter




  



// Leave this code here for the automated tests
module.exports = {
  parseFile,
}