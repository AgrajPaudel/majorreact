const fs = require('fs');
const { spawnSync } = require('child_process');

// Function to execute and handle the outlier_analysis_existing request
function executeOutlierAnalysisExisting(requestParams) {
    const { quarters, banks, filepath, variable, quarter, bank, filename, access_token, pythonscriptpath } = requestParams;
    const functionname = 'outlier_from_existing';
    
    // Replace 'python' with 'python3' or 'python' based on your system
    const pythonScriptPath = pythonscriptpath || 'D:/python tesseract/main.py';
    
    // Print the JSON data being sent to Python in the console
    console.log('Sending JSON to Python:', JSON.stringify({ access_token, functionname, quarters, banks, filepath, variable, quarter, bank, filename }, null, 2));
    
    const pythonProcess = spawnSync('D:/python tesseract/venv/Scripts/Python.exe', [pythonScriptPath, JSON.stringify({ access_token, functionname, quarters, banks, filepath, variable, quarter, bank, filename })], { stdio: 'inherit' });
    
    if (pythonProcess.error) {
        console.error(`Error from Python script: ${pythonProcess.error.message}`);
        return { error: pythonProcess.error.message };
    } else {
        try {
            // Split the output by lines and parse each line separately
            const outputLines = pythonProcess.stdout ? pythonProcess.stdout.toString().split('\n').filter(line => line.trim() !== '') : [];
            const outputData = outputLines.map(line => JSON.parse(line));
            
            // Read the generated JSON file
            const resultFilePath = `D:/python tesseract/${access_token}/z output/outlier_from_existing.json`;
            const fileContent = fs.readFileSync(resultFilePath, 'utf-8');
            
            // Delete the file after reading its content
            fs.unlinkSync(resultFilePath);
            
            // Parse and return the content with the modified structure
            const resultContent = JSON.parse(fileContent);

            const modifiedResult = {
                variables: [],
                'z score compared to all quarters from all banks': [],
                'z score compared to all banks in given quarter': [],
                'z score compared to all quarters of given bank': [],
                outlier: []
            };

            // Iterate over each instance in resultContent
            resultContent.forEach((instance) => {
                modifiedResult.variables.push(instance.variable);
                modifiedResult['z score compared to all quarters from all banks'].push(instance.values[0]);
                modifiedResult['z score compared to all banks in given quarter'].push(instance.values[1]);
                modifiedResult['z score compared to all quarters of given bank'].push(instance.values[2]);
                modifiedResult.outlier.push(instance.outlier);
            });
            modifiedResult['bank']=bank;
            modifiedResult['quarter']=quarter;
            return modifiedResult;
        } catch (error) {
            console.error(`Error parsing Python script output: ${error.message}`);
            return { error: `Error parsing Python script output: ${error.message}` };
        }
    }
}

module.exports = executeOutlierAnalysisExisting;
