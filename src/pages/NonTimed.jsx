import React,{useState,useEffect} from "react";
import TestNavbar from "../component/TestNavBar";
import BanklistData from "../component/banklist.js";
import BarChartData from "../class/bar_class.js";
import CreateBarChart from "../component/GraphTest-master/src/function/bar_function.js";
export default function NonTimed() {

  const [selectedQuarter1, setSelectedQuarter1] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState(null);
   //for bar graph
   const [bargraphdata, setbargraphdata]=useState(null);
   const [barcomplete,setbarcomplete]=useState(false);
   var bardata=[];

   useEffect(() => {
  
    setbarcomplete(true);
  }, [bargraphdata]); // Trigger the effect when bargraphdata changes

  const handleRunBankAndVariableFromExisting = async () => {

    if (!selectedMetric || !selectedQuarter1) {
      console.error("Please select both metric and quarter");
      return;
    }

    try {
      // Prepare the request parameters
      const requestParams = {
        access_token: 'z outp', // Replace with the actual access token
        variable: selectedMetric,
        quarter: selectedQuarter1,
      };
  
      // Log the JSON being sent to the server
      console.log('Sending JSON to Python:', JSON.stringify(requestParams));
  
      // Make the API call to the server
      const response = await fetch('/variable-and-quarter-from-existing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestParams),
      });
  
      // Check if the response is successful (status code 200)
      if (response.ok) {
        // Parse the response as text
        const result = await response.json();
  
        // Display the result in your component as needed
        console.log(result);

        const barinstance=new BarChartData(result.bank,'Bargraph',
        result,
        selectedMetric,
        selectedQuarter1
        );
        bardata.push(barinstance);
  
        // Add your logic here to handle the result, update state, or perform any other actions
        // For example, you might want to setState or dispatch an action in a Redux store
  
        // Sample logic: Update state with the result
        // updateState(result);
  
        // ... Add more logic as needed
  
      } else {
        // Handle the case where the API call was not successful
        console.error('Error calling the API');
      }

      var y=bardata;
      console.log(y);
      setbargraphdata(prevData => {
        return y;
      });
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error('Error:', error);
    }
  };
  
  return (
    <div>
      
      <h1>this is the non timedddgraph</h1>
      {/* Quarter Dropdown */}
      <label>Select Quarter:</label>

      <select
        value={selectedQuarter1}
        onChange={(e) => setSelectedQuarter1(e.target.value)}
        style={{ marginBottom: "10px" }}
      >
        <option value="">Select Quarter</option>
        {BanklistData.quarterlist.map((quarter, index) => (
          <option key={index} value={quarter}>
            {quarter}
          </option>
        ))}
      </select>

      {/* Financial Metric Dropdown for Variable and Bank Existing Data */}
      <label>Select Financial Metric:</label>
      <select
        value={selectedMetric}
        onChange={(e) => setSelectedMetric(e.target.value)}
        style={{ marginBottom: "10px" }}
      >
        <option value="">Select Financial Metric</option>
        {BanklistData.financial_metrics.map((metric, index) => (
          <option key={index} value={metric}>
            {metric}
          </option>
        ))}
      </select>
      <button onClick={handleRunBankAndVariableFromExisting} style={{ display: 'block', marginBottom: '10px' }} disabled={!selectedQuarter1 || !selectedMetric}>
        Bank and Variable From Existing
      </button>

      {/* Render the bar Plot based on the scatterplotData */}
      {bargraphdata && barcomplete && <CreateBarChart data={bargraphdata} />}
    </div>
  );
}
