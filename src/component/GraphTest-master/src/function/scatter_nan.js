function processQuarters(inputJson, quarterList) {
    // Check if the required properties are present in inputJson
    if (!inputJson || !inputJson.quarters || !inputJson.values) {
      console.error("Invalid inputJson. Expected quarters and values properties.");
      return { quarters: [], values: [] };
    }
  
    // Initialize arrays for the result JSON
    const resultJson = { quarters: [], values: [] };
  
    // Iterate over the quarters in the quarterList
    quarterList.forEach((quarter) => {
      // Find the index of the quarter in the quarters array
      const quarterIndex = inputJson.quarters.indexOf(quarter);
  
      // If the quarter is present, add it to the resultJson with its corresponding value
      // If not present, add it with 'nan'
      resultJson.quarters.push(quarter);
      resultJson.values.push(
        quarterIndex !== -1 ? inputJson.values[quarterIndex] : 'nan'
      );
    });
  
    console.log(resultJson);
    return resultJson;
  }
  
  export default processQuarters;
  