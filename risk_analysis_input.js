const fs = require('fs');
const { spawnSync } = require('child_process');

// Function to execute and handle the risk_analysis_input request
function executeRiskAnalysisInput(requestParams) {
    const { quarters, banks, filepath, variable, quarter, bank, filename, access_token, pythonscriptpath } = requestParams;
    const functionname = 'risk_analysis_input';
    
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
            const resultFilePath = `D:/python tesseract/${access_token}/z output/risk_analysis_input.json`;
            const fileContent = fs.readFileSync(resultFilePath, 'utf-8');
            
            // Delete the file after reading its content
            fs.unlinkSync(resultFilePath);
            
            // Parse and return the content with the modified structure
            const resultContent = JSON.parse(fileContent);

            const modifiedResult = {};
            Object.keys(resultContent).forEach((key, index) => {
                switch (index) {
                    case 0:
                        modifiedResult['index compared to all quarters from all banks'] = resultContent[key];
                        break;
                    case 1:
                        modifiedResult['index compared to all bank data in given quarter'] = resultContent[key];
                        break;
                    case 2:
                        modifiedResult['index compared to all quarters within this bank'] = resultContent[key];
                        break;
                    default:
                        break;
                }
            });

            // Add 'bank' and 'quarter' to the modified result
            modifiedResult['bank'] = bank;
            modifiedResult['quarter'] = quarter;

            return modifiedResult;
        } catch (error) {
            console.error(`Error parsing Python script output: ${error.message}`);
            return { error: `Error parsing Python script output: ${error.message}` };
        }
    }
}

module.exports = executeRiskAnalysisInput;
