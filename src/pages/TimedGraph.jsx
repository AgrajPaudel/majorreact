import React,{useState,useEffect} from "react";
import TestNavbar from "../component/TestNavBar";
import BanklistData from "../component/banklist.js";
import { Line } from "react-chartjs-2";
//here is new:
import "D:/majorproject-master/src/component/GraphTest-master/src/styles.css";
import D3Chart from "D:/majorproject-master/src/component/GraphTest-master/src/Axis";
import Chart from "D:/majorproject-master/src/component/GraphTest-master/src/ZoomGraph";
import LineChart from "D:/majorproject-master/src/component/GraphTest-master/src/LineChart";
import Map from "D:/majorproject-master/src/component/GraphTest-master/src/Map";
import Charto from "D:/majorproject-master/src/component/GraphTest-master/src/delete";
import LineChartoo from "D:/majorproject-master/src/component/GraphTest-master/src/nextwebsiteChart";
import LineChartoss from "D:/majorproject-master/src/component/GraphTest-master/src/FinalGraph";
import GraphData  from "../class/classes.js";

import CreateLineChart from "../component/GraphTest-master/src/function/graph_functions.js";


export default function TimedGraph() {
  const [results,setresults]=useState(null);
  const [selectedQuarter1, setSelectedQuarter1] = useState(null);
  const [selectedBank1, setSelectedBank1] = useState(null);
  const [linechartdata, setlinechartdata]=useState(null);
  const [sData, setSData] = useState({});
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [complete,setcomplete]=useState(false);
  const [soloBank, setSoloBank] = useState([]);
  var list_of_data=[];
  //////
  // State for the quarter list obtained from extract-column-header
  const [quarterList, setQuarterList] = useState([]);
  
  

  // State for the new quarter dropdown
  const [selectedQuarterForInput, setSelectedQuarterForInput] = useState(null);

  // State for the extracted row headers
  const [variables, setvariablesList] = useState([]);
  const [selectedvariableforOutput, setSelectedVariableForOutput] = useState(null);


  ////////////
const handleRunExtractRowHeader = async () => {
  try {
    // Prepare the request parameters
    const requestParams = {
      access_token: 'z outp', // Replace with the actual access token
      filename: 'merged_file.csv'
    };

    // Log the JSON being sent to the server
    console.log('Sending JSON to Python:', JSON.stringify(requestParams));

    // Make the API call to the server
    const response = await fetch('/extract-row-header', {
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
      setvariablesList(result.variables);

      // Add your logic here to handle the result, update state, or perform any other actions
      // For example, you might want to setState or dispatch an action in a Redux store

      // Sample logic: Update state with the result
      // updateState(result);

      // ... Add more logic as needed

    } else {
      // Handle the case where the API call was not successful
      console.error('Error calling the API');
    }
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error('Error:', error);
  }
};

const handleRunExtractColumnHeader = async () => {
  try {
    // Prepare the request parameters
    const requestParams = {
      access_token: 'z outp', // Replace with the actual access token
      filename: 'merged_file.csv'
    };

    // Log the JSON being sent to the server
    console.log('Sending JSON to Python:', JSON.stringify(requestParams));

    // Make the API call to the server
    const response = await fetch('/extract-column-header', {
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
      console.log(result)
      console.log('Result columns:', result.columns);
      setQuarterList(result.columns)
      // Display the result in your component as needed
      console.log(result);

      // Add your logic here to handle the result, update state, or perform any other actions
      // For example, you might want to setState or dispatch an action in a Redux store

      // Sample logic: Update state with the result
      // updateState(result);

      // ... Add more logic as needed

    } else {
      // Handle the case where the API call was not successful
      console.error('Error calling the API');
    }
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error('Error:', error);
  }
};

////////

// useEffect to run when the component mounts
useEffect(() => {
  // Call the functions when the component mounts
  handleRunExtractRowHeader();
  handleRunExtractColumnHeader();
}, []); // The empty dependency array ensures that it runs only on mount


// useEffect to log state changes
useEffect(() => {
  
  setcomplete(true);
}, [linechartdata]); // Trigger the effect when linechartdata changes



  const handleRunBankAndQuarterFromExisting = async () => {
    try {
      if (!selectedQuarter1 || !selectedBank1) {
        console.error("Please select both quarter and bank");
        return;
      }

      // Prepare the request parameters
      const requestParams = {
        access_token: "z outp", // Replace with the actual access token
        quarter: selectedQuarter1,
        bank: selectedBank1,
      };

      // Log the JSON being sent to the server
      console.log("Sending JSON to Python:", JSON.stringify(requestParams));

      setIsLoading(true);

      // Make the API call to the server
      const response = await fetch("/bank-and-quarter-from-existing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestParams),
      });

      // Check if the response is successful (status code 200)
      if (response.ok) {
        setIsLoading(false);
        // Parse the response as text
        const result = await response.json();
        setSData(result);
        setSoloBank(
          ...result.variable.map((x, index) => ({ [x]: result.values[index] }))
        );

        // Display the result in your component as needed
        console.log(result);

        // Add your logic here to handle the result, update state, or perform any other actions
        // For example, you might want to setState or dispatch an action in a Redux store

        // Sample logic: Update state with the result
        // updateState(result);

        // ... Add more logic as needed
      } else {
        // Handle the case where the API call was not successful
        console.error("Error calling the API");
      }
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error("Error:", error);
    }
  };


  const handleRunVariableAndBankFromExisting = async () => {
    try {
      if (!selectedMetric) { 
        console.error("Please select both metric and bank(s)");
        return;
      }
      
      console.log(BanklistData.bank_list);
      for (let i=0;i<BanklistData.bank_list.length;i++) {
       
        // Prepare the request parameters
        const requestParams = {
          access_token: "z outp", // Replace with the actual access token
          bank: BanklistData.bank_list[i],
          variable: selectedMetric,
        };

        // Log the JSON being sent to the server
        console.log("Sending JSON to Python:", JSON.stringify(requestParams));

        // Make the API call to the server
        const response = await fetch("/bank-and-variable-from-existing", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestParams),
        });

        // Check if the response is successful (status code 200)
        if (response.ok) {
          // Parse the response as text
          const result = await response.json();

  
          console.log(result);
          
          const graphinstance=new GraphData(BanklistData.bank_list[i],'Timed_line',result,selectedMetric);
          list_of_data.push(graphinstance);
          
        } else {
          // Handle the case where the API call was not successful
          console.error("Error calling the API for bank:", BanklistData.bank_list[i]);
        }
        
       

      }
      var x=list_of_data;
      console.log(x)
       
      //Use the state callback to update linechartdata
      setlinechartdata(prevData => {
        return x;
      });
      

    } catch (error) {
      // Handle any errors that occur during the API call
      console.error("Error:", error);
    }
  };

  const handleRunQuarterfromInput = async () => {
    try {
      if (!selectedQuarterForInput) {
        console.error("Please select a quarter");
        return;
      }

      // Prepare the request parameters
      const requestParams = {
        access_token: "z outp",
        quarter: selectedQuarterForInput,
        filename: 'merged_file.csv',
        // Omitting bank since there is no bank dropdown
      };

      // Log the JSON being sent to the server
      console.log("Sending JSON to Python:", JSON.stringify(requestParams));

      // Make the API call to the server
      const response = await fetch("/quarter-from-input", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestParams),
      });

      // Check if the response is successful (status code 200)
      if (response.ok) {
        // Parse the response as text
        const result = await response.text();

        // Display the result in your component as needed
        console.log(result);

        // Add your logic here to handle the result, update state, or perform any other actions
        // For example, you might want to setState or dispatch an action in a Redux store

        // Sample logic: Update state with the result
        // updateState(result);

        // ... Add more logic as needed
      } else {
        // Handle the case where the API call was not successful
        console.error("Error calling the API");
      }
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error("Error:", error);
    }
  };

  
  
  const handleRunVariablefromInput = async () => {
    try {
      if (!selectedvariableforOutput) {
        console.error("Please select a row header");
        return;
      }
 
      // Prepare the request parameters
      const requestParams = {
        access_token: 'z outp', // Replace with the actual access token
        variable: selectedvariableforOutput,
        filename: 'merged_file.csv'
      };
  
      // Log the JSON being sent to the server
      console.log('Sending JSON to Python:', JSON.stringify(requestParams));
  
      // Make the API call to the server
      const response = await fetch('/variable-from-input', {
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
        setresults(result);
        console.log(results);
  
        // Add your logic here to handle the result, update state, or perform any other actions
        // For example, you might want to setState or dispatch an action in a Redux store
  
        // Sample logic: Update state with the result
        // updateState(result);
  
        // ... Add more logic as needed
  
      } else {
        // Handle the case where the API call was not successful
        console.error('Error calling the API');
      }
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error('Error:', error);
    }
  };

  

  return (
    
      <div>
      <TestNavbar></TestNavbar>
      <h1>this is the timed ggggraph</h1>
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

      {/* Bank Dropdown for Bank and Quarter Existing Data */}
      <label>Select Bank:</label>
      <select
        value={selectedBank1}
        onChange={(e) => setSelectedBank1(e.target.value)}
        style={{ marginBottom: "10px" }}
      >
        <option value="">Select Bank</option>
        {BanklistData.bank_list.map((bank, index) => (
          <option key={index} value={bank}>
            {bank}
          </option>
        ))}
      </select>

      {/* Button to run the API call for Bank and Quarter Existing Data */}
      <button
        onClick={handleRunBankAndQuarterFromExisting}
        style={{ display: "block", marginBottom: "10px" }}
        disabled={!selectedQuarter1 || !selectedBank1}
      >
        Bank and Quarter Existing Data
      </button>

      

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

      {/* Button to run the API call for Variable and Bank Existing Data */}
      <button
        onClick={handleRunVariableAndBankFromExisting}
        style={{ display: "block", marginBottom: "10px" }}
        disabled={!selectedMetric}
      >
        Variable and Bank Existing Data
      </button>

      {/* Render the Line Chart based on the resultData */}
    {linechartdata && complete && <CreateLineChart data={linechartdata} />}
      
      {/* New Quarter Dropdown for "Quarter from Input" */}
      <label>Select Quarter for Input:</label>
      <select
        value={selectedQuarterForInput}
        onChange={(e) => setSelectedQuarterForInput(e.target.value)}
        style={{ marginBottom: "10px" }}
      >
        <option value="">Select Quarter for Input</option>
        {quarterList.map((quarter, index) => (
          <option key={index} value={quarter}>
            {quarter}
          </option>
        ))}
      </select>

      {/* Button to run the API call for Quarter from Input */}
<button
  onClick={handleRunQuarterfromInput}
  style={{ display: "block", marginBottom: "10px" }}
  disabled={!selectedQuarterForInput}
>
  Quarter from Input
</button>
          
          
          {/* New Variable Dropdown for "Quarter from Input" */}
      <label>Select Variable for Input:</label>
      <select
        value={selectedvariableforOutput}
        onChange={(e) => setSelectedVariableForOutput(e.target.value)}
        style={{ marginBottom: "10px" }}
      >
        <option value="">Select Variable for Input</option>
        {variables.map((variable, index) => (
          <option key={index} value={variable}>
            {variable}
          </option>
        ))}
      </select>
      

    
      {/* Button to run the API call for Variable from Input */}
      <button
        onClick={handleRunVariablefromInput}
        style={{ display: "block", marginBottom: "10px" }}
        disabled={!selectedvariableforOutput}
      >
        Variable from Input
      </button>
        {/*table here*/}
        
        <table className="table-custom">
          <thead>
            <tr>
              <th>Variable</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {sData &&
              sData.variable &&
              sData.values &&
              sData.variable.map((x, index) => (
                <tr key={index}>
                  <td>{x}</td>
                  <td>{sData.values[index]}</td>
                </tr>
              ))}
          </tbody>
        </table>
                {/*end table */}

                
      
      
    </div>
    
  );
}


