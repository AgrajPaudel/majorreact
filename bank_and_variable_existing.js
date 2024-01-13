const fs = require('fs');
const { spawnSync } = require('child_process');

// Function to execute and handle the risk_analysis_existing request
function executeBankandVariableExisting(requestParams) {
    const { quarters, banks, filepath, variable, quarter, bank, filename, access_token, pythonscriptpath } = requestParams;
    const functionname = 'bank_and_variable_extraction_from_oldfiles';
  
    // Replace 'python' with 'python3' or 'python' based on your system
    const pythonScriptPath = pythonscriptpath || 'D:/python tesseract/main.py';
    
    // Print the JSON data being sent to Python in the console
    console.log('Sending JSON to Python:', JSON.stringify({ access_token,functionname, quarters, banks, filepath, variable, quarter, bank, filename }, null, 2));
  
    const pythonProcess = spawnSync('D:/python tesseract/venv/Scripts/Python.exe', [pythonScriptPath, JSON.stringify({ access_token,functionname, quarters, banks, filepath, variable, quarter, bank, filename })], { stdio: 'inherit' });
  
    if (pythonProcess.error) {
      console.error(`Error from Python script: ${pythonProcess.error.message}`);
      return { error: pythonProcess.error.message };
    } else {
      try {
        // Split the output by lines and parse each line separately
        const outputLines = pythonProcess.stdout ? pythonProcess.stdout.toString().split('\n').filter(line => line.trim() !== '') : [];
        const outputData = outputLines.map(line => JSON.parse(line));
  
        // Read the generated JSON file
        const resultFilePath = `D:/python tesseract/${access_token}/z output/bank_and_variable_existing.json`;
        const fileContent = fs.readFileSync(resultFilePath, 'utf-8');
  
        // Delete the file after reading its content
        fs.unlinkSync(resultFilePath);
  
        // Parse and return the content
        const resultContent = JSON.parse(fileContent);
        const modifiedResult = Array.isArray(resultContent)
          ? {
              quarter: resultContent.map(entry => entry.quarter),
              values: resultContent.map(entry => entry.value),
              variable: variable,
              bank:bank,
            }
          : { error: 'Invalid output format from Python script' };
      
        return modifiedResult;
      } catch (error) {
        console.error(`Error parsing Python script output: ${error.message}`);
        return { error: `Error parsing Python script output: ${error.message}` };
      }
    }
  }

  module.exports = executeBankandVariableExisting;