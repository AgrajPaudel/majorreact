import React,{useState,useEffect} from "react";
import TestNavbar from "../component/TestNavBar";
import BanklistData from "../component/banklist.js";

const Others = () => {
  //risk analysis existing
  const [selectedQuarter1, setSelectedQuarter1] = useState(null);
  const [selectedBank1, setSelectedBank1] = useState(null);

  //outlier analysis existing:
  const [selectedQuarter2, setSelectedQuarter2] = useState(null);
  const [selectedBank2, setSelectedBank2] = useState(null);

  // State for the quarter list obtained from extract-column-header
  const [quarterList, setQuarterList] = useState([]);
  
  
  

  // State for the new quarter dropdown
  const [selectedQuarterForInput, setSelectedQuarterForInput] = useState(null);
  const [selectedQuarterForriskinput, setSelectedQuarterForriskinput] = useState(null);

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



  const handleRunRiskAnalysis = async () => {
    try {
      const requestParams = {
        quarter: selectedQuarter1,
        bank: selectedBank1,
        filepath: 'D:/python tesseract/z score/3d_zscore_table.csv',
        access_token: 'z outp', // Replace with the actual access token
      };
  
      console.log('Sending JSON to Python:', JSON.stringify(requestParams));
  
      const response = await fetch('/run-risk-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestParams),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result); // Access the JSON response
        // ... rest of the code
      } else {
        console.error('Error calling the API');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleRunRiskAnalysisforinput = async () => {
    try {
      var access_token='z outp';
      const requestParams = {
        quarter: selectedQuarterForriskinput,
        filepath: 'D:/python tesseract/'+access_token+'/z output/z_scores.csv',
        access_token: 'z outp', // Replace with the actual access token
      };
  
      console.log('Sending JSON to Python:', JSON.stringify(requestParams));
  
      const response = await fetch('/run-risk-analysis-input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestParams),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result); // Access the JSON response
        // ... rest of the code
      } else {
        console.error('Error calling the API');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleRunOutlierfromInput = async () => {
    try {
      const requestParams = {
        quarter: selectedQuarterForInput,
        access_token: 'z outp', // Replace with the actual access token
      };
  
      console.log('Sending JSON to Python:', JSON.stringify(requestParams));
  
      const response = await fetch('/outlier-from-input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestParams),
      });

      if (response.ok) {
        const result = await response.text();
        console.log(result); // Access the response as text
        // ... rest of the code
      } else {
        console.error('Error calling the API');
      }
    } catch (error) {
      console.error('Error:', error);
    }
};

const handleRunKnnOutput = async () => {
  try {
    const requestParams = {
      access_token: 'z outp', // Replace with the actual access token
    };

    console.log('Sending JSON to Python:', JSON.stringify(requestParams));

    const response = await fetch('/knn-output', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestParams),
    });

    if (response.ok) {
      const result = await response.text();
      console.log(result); // Access the response as text

    } else {
      console.error('Error calling the API');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


const handleRunOutlierFromExisting = async () => {
  try {
    // Prepare the request parameters
    const requestParams = {
      access_token: 'z outp', // Replace with the actual access token
      quarter: selectedQuarter2,
      bank: selectedBank2,
      filepath: 'D:/python tesseract/z score/3d_zscore_table.csv'
    };

    // Log the JSON being sent to the server
    console.log('Sending JSON to Python:', JSON.stringify(requestParams));

    // Make the API call to the server
    const response = await fetch('/outlier-from-existing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
      console.error('Error calling the API');
    }
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error('Error:', error);
  }
};




  return (
    <div>
      <TestNavbar />
      <h1>This is other</h1>
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

      <button onClick={handleRunRiskAnalysis} 
      style={{ display: 'block', marginBottom: '10px' }}
      disabled={!selectedQuarter1 || !selectedBank1}>
        Run Risk Analysis
      </button>

      {/* New Quarter Dropdown for "risk analysis from Input" */}
      <label>Select Quarter for Input:</label>
      <select
        value={selectedQuarterForriskinput}
        onChange={(e) => setSelectedQuarterForriskinput(e.target.value)}
        style={{ marginBottom: "10px" }}
      >
        <option value="">Select Quarter for Input</option>
        {quarterList.map((quarter, index) => (
          <option key={index} value={quarter}>
            {quarter}
          </option>
        ))}
      </select>

      <button onClick={handleRunRiskAnalysisforinput} 
      style={{ display: 'block', marginBottom: '10px' }}
      disabled={!selectedQuarterForriskinput}>
        Run Risk Analysis for input
      </button>

      
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

      <button onClick={handleRunOutlierfromInput} 
      style={{ display: 'block', marginBottom: '10px' }}
      disabled={!selectedQuarterForInput}>
        Outlier from input
      </button>
      <button onClick={handleRunKnnOutput} style={{ display: 'block', marginBottom: '10px' }}
      >
        Knn Output
      </button>
      {/*quarter dropdown*/}
      <label>Select Quarter:</label>
      <select
        value={selectedQuarter2}
        onChange={(e) => setSelectedQuarter2(e.target.value)}
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
        value={selectedBank2}
        onChange={(e) => setSelectedBank2(e.target.value)}
        style={{ marginBottom: "10px" }}
      >
        <option value="">Select Bank</option>
        {BanklistData.bank_list.map((bank, index) => (
          <option key={index} value={bank}>
            {bank}
          </option>
        ))}
      </select>
      <button onClick={handleRunOutlierFromExisting} 
      style={{ display: 'block', marginBottom: '10px' }}
      disabled={!selectedQuarter2 || !selectedBank2}>
        Outlier from existing
      </button>
    </div>
  );
};

export default Others;
