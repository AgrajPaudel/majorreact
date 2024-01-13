const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const executeOutlierAnalysisExisting=require('./outlier_from_existing.js')
const executeriskAnalysisExisting=require('./risk_analysis_existing.js')
const executeKnnOutput=require('./knn_output.js')
const executeOutlierAnalysisInput=require('./outlier_analysis_input.js')
const executeBankandQuarterExisting=require('./bank_and_quarter_existing.js')
const executeBankandVariableExisting=require('./bank_and_variable_existing.js')
const executeQuarterandVariableExisting=require('./quarter_and_variable_existing.js')
const executeQuarterFromInput=require('./quarter_from_input.js')
const executeVariableFromInput=require('./variable_from_input.js')
const executeExtractRowHeader=require('./extract_row_header.js')
const executeExtractColumnHeader=require('./extract_column_headers.js')
const app = express();
const port = 5000;

app.use(express.static('client/build'));
app.use(bodyParser.json()); // for parsing application/json

// Your existing route for serving the React app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// New route to trigger the Python script
app.post('/run-risk-analysis', (req, res) => {
  const requestParams = req.body;

  

  try {
    const outputData = executeriskAnalysisExisting(requestParams);
    console.log(`Python script output: `, outputData);
    res.status(200).json(outputData);  // Sending the Python script output as JSON response
  } catch (error) {
    const errorMessage = `Error: ${error.message}`;
    console.error(errorMessage);
    res.status(500).send(errorMessage);
  }
});

//for outlier from input
app.post('/outlier-from-input', (req, res) => {
  const requestParams = req.body;

  

  try {
    const outputData = executeOutlierAnalysisInput(requestParams);
    console.log(`Python script output: `, outputData);
    res.status(200).json(outputData);  // Sending the Python script output as JSON response
  } catch (error) {
    const errorMessage = `Error: ${error.message}`;
    console.error(errorMessage);
    res.status(500).send(errorMessage);
  }
});

//for knn output
 
app.post('/knn-output', (req, res) => {
  const requestParams = req.body;

  

  try {
    const outputData = executeKnnOutput(requestParams);
    console.log(`Python script output: `, outputData);
    res.status(200).json(outputData);  // Sending the Python script output as JSON response
  } catch (error) {
    const errorMessage = `Error: ${error.message}`;
    console.error(errorMessage);
    res.status(500).send(errorMessage);
  }
});

//outlier from existing
app.post('/outlier-from-existing', (req, res) => {
  const requestParams = req.body;

  

  try {
    const outputData = executeOutlierAnalysisExisting(requestParams);
    console.log(`Python script output: `, outputData);
    res.status(200).json(outputData);  // Sending the Python script output as JSON response
  } catch (error) {
    const errorMessage = `Error: ${error.message}`;
    console.error(errorMessage);
    res.status(500).send(errorMessage);
  }
});

//bank and quarter from existing
app.post('/bank-and-quarter-from-existing', (req, res) => {
  const requestParams = req.body;

  

  try {
    const outputData = executeBankandQuarterExisting(requestParams);
    console.log(`Python script output: `, outputData);
    res.status(200).json(outputData);  // Sending the Python script output as JSON response
  } catch (error) {
    const errorMessage = `Error: ${error.message}`;
    console.error(errorMessage);
    res.status(500).send(errorMessage);
  }
});

//bank and variable from existing
app.post('/bank-and-variable-from-existing', (req, res) => {
  const requestParams = req.body;

  

  try {
    const outputData = executeBankandVariableExisting(requestParams);
    console.log(`Python script output: `, outputData);
    res.status(200).json(outputData);  // Sending the Python script output as JSON response
  } catch (error) {
    const errorMessage = `Error: ${error.message}`;
    console.error(errorMessage);
    res.status(500).send(errorMessage);
  }
});

//quarter and variable from existing
app.post('/variable-and-quarter-from-existing', (req, res) => {
  const requestParams = req.body;

  

  try {
    const outputData = executeQuarterandVariableExisting(requestParams);
    console.log(`Python script output: `, outputData);
    res.status(200).json(outputData);  // Sending the Python script output as JSON response
  } catch (error) {
    const errorMessage = `Error: ${error.message}`;
    console.error(errorMessage);
    res.status(500).send(errorMessage);
  }
});

//quarter from input
app.post('/quarter-from-input', (req, res) => {
  const requestParams = req.body;

  

  try {
    const outputData = executeQuarterFromInput(requestParams);
    console.log(`Python script output: `, outputData);
    res.status(200).json(outputData);  // Sending the Python script output as JSON response
  } catch (error) {
    const errorMessage = `Error: ${error.message}`;
    console.error(errorMessage);
    res.status(500).send(errorMessage);
  }
});

//variable from input
app.post('/variable-from-input', (req, res) => {
  const requestParams = req.body;

  

  try {
    const outputData = executeVariableFromInput(requestParams);
    console.log(`Python script output: `, outputData);
    res.status(200).json(outputData);  // Sending the Python script output as JSON response
  } catch (error) {
    const errorMessage = `Error: ${error.message}`;
    console.error(errorMessage);
    res.status(500).send(errorMessage);
  }
});

//extract row header
app.post('/extract-row-header', (req, res) => {
  const requestParams = req.body;

  

  try {
    const outputData = executeExtractRowHeader(requestParams);
    console.log(`Python script output: `, outputData);
    res.status(200).json(outputData);  // Sending the Python script output as JSON response
  } catch (error) {
    const errorMessage = `Error: ${error.message}`;
    console.error(errorMessage);
    res.status(500).send(errorMessage);
  }
});

//extract column headers
app.post('/extract-column-header', (req, res) => {
  const requestParams = req.body;

  

  try {
    const outputData = executeExtractColumnHeader(requestParams);
    console.log(`Python script output: `, outputData);
    res.status(200).json(outputData);  // Sending the Python script output as JSON response
  } catch (error) {
    const errorMessage = `Error: ${error.message}`;
    console.error(errorMessage);
    res.status(500).send(errorMessage);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

