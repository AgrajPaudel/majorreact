import React,{useState,useEffect} from "react";
import "./tooltip.css";
import TestNavbar from "../component/TestNavBar";
import BanklistData from "../component/banklist.js";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import cleaner from "../cleaner_functions.js"
import percentileData from '../percentile.json';
import { fa } from "faker/lib/locales.js";
import NormalDistributionChart from "../component/GraphTest-master/src/function/z_score_function.js";
import ZScoreChart from "../component/GraphTest-master/src/function/z_score_function.js";
import ZscoreGraph from "../component/GraphTest-master/src/function/z_score_function.js";

const Others = () => {
  const tooltips = [
    "Reserves act as a buffer against economic shocks and ensure stability within the financial system.",
    "Long-term borrowing instruments issued by corporations, often with fixed interest rates, offering investors a steady stream of income over time. They provide debt security.",
    "The act of taking money from a bank and paying it back over a period of time.",
    "A deposit is essentially your money that you transfer to another party.",
    "Income tax liability is the amount owed to the government based on taxable income, impacting financial planning and budgeting.",
    "Other liabilities are the amounts owed to the public and are not reported elsewhere in the balance sheet.",
    "Total assets represent the combined value of possessions and investments, indicating financial worth and influencing strategic decisions.",
    "Loans and advancements are funds provided by banks for borrowing, enabling individuals or businesses to pursue various financial goals, repaid with interest over time.",
    "Interest income is money earned from investments or savings, like bond interest or bank deposits, contributing to financial growth.",
    "Interest expense is the cost of borrowing funds, impacting profitability.",
    "Net interest income is the profit generated from interest earnings minus interest expenses.",
    "Net fee and commission income is the revenue from fees and commissions after subtracting related expenses, reflecting non-interest income profitability.",
    "Total operating income is the revenue generated from core business activities before subtracting expenses.",
    "Staff expenses represent the costs incurred by a company related to its employees, including salaries, wages, benefits, and payroll taxes.",
    "Operating profit is the revenue remaining after deducting operating expenses, indicating the profitability of a company's core business activities.",
    "Gains or losses generated from activities outside a company's primary business operations.",
    "Profit for the period is the net income earned by a company over a specific time frame, typically calculated by subtracting all expenses from total revenue.",
    "Measures a bank's capital adequacy by comparing its capital reserves to its risk-weighted assets, indicating its ability to absorb potential losses.",
    "The proportion of loans within a bank's portfolio that are not generating income due to non-payment.",
    "The provision-to-NPL ratio assesses a bank's reserve adequacy for managing credit risk.",
    "Expenses incurred by a financial institution to acquire capital for lending purposes.",
    "Difference between the interest earned on assets and the interest paid on liabilities.",
    "Return on equity (ROE) measures a company's profitability by expressing its net income as a percentage of shareholders' equity.",
    "Return on total assets (ROA) evaluates a company's profitability by expressing its net income as a percentage of its total assets.",
    "The credit-to-deposit ratio assesses a bank's lending activities by comparing the total amount of loans extended to customers to the deposits it holds.",
    "The base rate is the benchmark interest rate set by a central bank or financial authority.",
    "The current trading price of a company's stock on the open market.",
    "Other liabilities encompass various financial obligations of a company that are not categorized under specific headings.",
    "Also known as the debt-to-equity ratio, measures a company's leverage by comparing its total debt to its total equity.",
    "The interest income to assets ratio evaluates a company's ability to generate interest income relative to its total assets.",
    "Interest income margin is a measure of profitability that assesses the efficiency of a company's interest-earning assets in generating interest income.",
    "Return on investment (ROI) measures the profitability of an investment by comparing the gain or loss generated relative to the cost of the investment.",
    "Commission to operating income ratio assesses the portion of a company's operating income generated from commission-based activities.",
    "Net profit margin measures a company's profitability by expressing its net income as a percentage of its total revenue.",
    "The portion of a company's operating profit that is allocated to income taxes, reflecting the taxes paid on the company's earnings before interest and taxes (EBIT).",
    "Assesses a bank's lending activities by comparing the total amount of loans it has extended to customers to the amount of deposits it holds.",
    // Add more tooltips as needed
  ];
  
  //risk analysis existing
  const [selectedQuarter1, setSelectedQuarter1] = useState(null);
  const [selectedBank1, setSelectedBank1] = useState(null);

  //outlier analysis existing:
  const [selectedQuarter2, setSelectedQuarter2] = useState(null);
  const [selectedBank2, setSelectedBank2] = useState(null);

  // State for the quarter list obtained from extract-column-header
  const [quarterList, setQuarterList] = useState([]);
  const [knncomplete,setknncomplete] =useState(false);
  
  
  

  // State for the new quarter dropdown
  const [selectedQuarterForInput, setSelectedQuarterForInput] = useState(null);
  const [selectedQuarterForriskinput, setSelectedQuarterForriskinput] = useState(null);

  // State for the extracted row headers
  const [variables, setvariablesList] = useState([]);
  const [selectedvariableforOutput, setSelectedVariableForOutput] = useState(null);

  //for risk analysis
  const [riskData, setRiskData] = useState([]);
  //for outlier from existing
  const [outlierData, setOutlierData] = useState([]);
  //for outlier input
  const [inputOutlierData, setInputOutlierData] = useState([]);
  const [inputRiskData, setInputRiskData] = useState([]);
  //for knn:
  const [knndata, setknndata] = useState([]);


  function findSuccessor(inputStr, list) {
    console.log(inputStr);
    console.log(list);
    // Find the index where the input string falls in the list
    const index = list.findIndex(element => element === inputStr);
    console.log(list[index]);
    console.log(index);
    // If the input string exists in the list, return its successor
    if (index !== -1 && index < list.length - 1) {
        return list[index + 1];
    } else {
        return '';
    }
}


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



function getPercentileNumber(zScore) {
  if (zScore === 'nan') {
    return '';
  }

  console.log('zScore=', zScore);
  const sortedPercentiles = percentileData.percentiles.sort((a, b) => a.zScore - b.zScore);

  // If z score is smaller than the lowest z score in the JSON data, return 0%
  if (zScore < sortedPercentiles[0].zScore) {
    return '0%';
  }

  // If z score is larger than the largest z score in the JSON data, return 100%
  if (zScore > sortedPercentiles[sortedPercentiles.length - 1].zScore) {
    return '100%';
  }

  // Find the nearest lower and upper z scores
  let lowerPercentile = null;
  for (const percentile of sortedPercentiles) {
    if (percentile.zScore <= zScore) {
      lowerPercentile = percentile;
    } else {
      break; // Stop iteration once we find the upper z score
    }
  }
  console.log(lowerPercentile.percentile);
  // Return the percentile of the higher z score
  return `${lowerPercentile.percentile}%`;
}


function formatNumberToDecimalPlaces(number, decimalPlaces) {
  // Check if the number is valid
  if (isNaN(number)) {
      return 'Invalid number';
  }

  // Round the number to the specified decimal places
  const roundedNumber = Math.round(number * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);

  // Convert the rounded number to a string with fixed decimal places
  return roundedNumber.toFixed(decimalPlaces);
}



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
        setRiskData(result);
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
        setInputRiskData(result);
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
        const result = await response.json();
        console.log(result); // Access the response as text
        setInputOutlierData(result);
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
      const result = await response.json();
      console.log(result); // Access the response as text
      
      setknndata(result);
      setknncomplete(true);
      const currentdata = Object.keys(result).map(quarter => {
        const firstQuarter = result[quarter]['1st data'];
        const successorQuarter = firstQuarter.quarter;
        console.log('bkkjsaddsa',firstQuarter.bank);
        return {
            bank: firstQuarter.bank,
            quarter: successorQuarter
        };
    });
      const newData = Object.keys(result).map(quarter => {
        const firstQuarter = result[quarter]['1st data'];
        const successorQuarter = findSuccessor(firstQuarter.quarter, BanklistData.quarterlist);
        console.log('bkkjsaddsa',firstQuarter.bank);
        return {
            bank: firstQuarter.bank,
            quarter: successorQuarter
        };
    });
    const olddata_searched=[];
    const newdata_searched=[];
    for(let i=0;i<newData.length;i++){
      const requestParams = {
        access_token: "z outp", // Replace with the actual access token
        quarter: newData[i].quarter,
        bank: newData[i].bank,
      };

      const response = await fetch("/bank-and-quarter-from-existing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestParams),
      });
      const result =await response.json();
      newdata_searched.push(result);
    }

    for(let i=0;i<currentdata.length;i++){
      const requestParams = {
        access_token: "z outp", // Replace with the actual access token
        quarter: currentdata[i].quarter,
        bank: currentdata[i].bank,
      };

      const response = await fetch("/bank-and-quarter-from-existing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestParams),
      });
      const result=await response.json();
      olddata_searched.push(result);
    }

    console.log('adsdsdasdas');
    console.log(olddata_searched);
    console.log('adsdsdasdas');
    console.log(newdata_searched);
    console.log('adsdsdasdas');

    const variance = [];
    

for (let i = 0; i < olddata_searched.length; i++) {
    const oldInstance = olddata_searched[i];
    const newInstance = newdata_searched[i];
    console.log(oldInstance);
    console.log(oldInstance.JSON);
    console.log(oldInstance.value)
    console.log(oldInstance.variable)
    console.log(oldInstance.quarter)

    const varianceInstance = {
        variable: oldInstance.variable, // Assuming variable property exists in oldInstance and newInstance
        values: [],
        quarter: newInstance.quarter,
    };

    // Check if both old and new instances have the same number of values
    if (oldInstance.values.length !== newInstance.values.length) {
        console.error(`Error: Mismatch in the number of values for ${oldInstance.variable}`);
        continue; // Skip this instance if there's a mismatch
    }

    // Calculate variance for each corresponding pair of values
    for (let j = 0; j < oldInstance.values.length; j++) {
        const oldValue = oldInstance.values[j];
        const newValue = newInstance.values[j];

        const percentVariance = ((newValue - oldValue) / oldValue) * 100;
        varianceInstance.values.push(percentVariance);
    }

    variance.push(varianceInstance);
    
}

console.log(variance);

////////////////yeta nira
const input_data_for_knn=[];
for(let i=0;i<quarterList.length;i++){
  const requestParams = {
    access_token: "z outp", // Replace with the actual access token
    quarter: quarterList[i],
    filename: 'merged_file.csv',
  };

  const response = await fetch("/quarter-from-input", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestParams),
  });
  const result=await response.json();
  input_data_for_knn.push(result);

}
console.log('input data',input_data_for_knn);

const predicted_data=[];

    for(let i=0;i<variance.length;i++){
      const variance_instance=variance[i];
      const old_instance=olddata_searched[i]
      const predicted_data_instance={
        variable: variance_instance.variable,
        quarter: variance_instance.quarter,
        values: [],
      }

      for(let i=0;i<variance_instance.values.length;i++){
        predicted_data_instance.values.push(old_instance.values[i]*(1+variance_instance.values[i]/100));
      }
      predicted_data.push(predicted_data_instance);

    }
    console.log(predicted_data);

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
      const result = await response.json();

      // Display the result in your component as needed
      console.log(result);
      setOutlierData(result);
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

const renderTooltip = (index) => (
  <Tooltip id={`tooltip-${index}`} placement="right">
    {tooltips[index]}
  </Tooltip>
);

const renderTooltipzscore = (index, value) => {
  
  return (
    <Tooltip id={`tooltip-${index}`} placement="right" className="custom-tooltip-style">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '10px' }}>Falls under {getPercentileNumber(value) } from left.</div>
        <div style={{ width: '400px', height: '400px' }}>
          <ZScoreChart value={value} />
        </div>
      </div>
    </Tooltip>
  );
};








return (
  <div className=" my-10 container">
    
    {/* Quarter Dropdown */}
    <div className="flex gap-x-16">
      <div className="flex flex-col gap-y-2">
        <label>Select Quarter:</label>
        <select
          value={selectedQuarter1}
          onChange={(e) => setSelectedQuarter1(e.target.value)}
          style={{ marginBottom: "10px" }}
          className="select select-bordered w-full max-w-xs select-sm"
        >
          <option value="">Select Quarter</option>
          {BanklistData.quarterlist.map((quarter, index) => (
            <option key={index} value={quarter}>
              {quarter}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-y-2 ">
        {/* Bank Dropdown for Bank and Quarter Existing Data */}
        <label>Select Bank:</label>
        <select
          value={selectedBank1}
          onChange={(e) => setSelectedBank1(e.target.value)}
          style={{ marginBottom: "10px" }}
          className="select select-bordered w-full max-w-xs select-sm"
        >
          <option value="">Select Bank</option>
          {BanklistData.bank_list.map((bank, index) => (
            <option key={index} value={bank}>
              {bank}
            </option>
          ))}
        </select>
      </div>
    </div>
    <button
      onClick={handleRunRiskAnalysis}
      style={{ display: "block", marginBottom: "10px" }}
      disabled={!selectedQuarter1 || !selectedBank1}
      className={` btn btn-outline btn-primary w-64 btn-sm  ${
        (!selectedQuarter1 || !selectedBank1) && "text-black"
      }`}
    >
      Run Risk Analysis
    </button>

    <div className="flex flex-col gap-y-2">
        <label>Select Quarter:</label>
        <select
          value={selectedQuarterForriskinput}
          onChange={(e) => setSelectedQuarterForriskinput(e.target.value)}
          style={{ marginBottom: "10px" }}
          className="select select-bordered w-full max-w-xs select-sm"
        >
          <option value="">Select Quarter</option>
          {quarterList.map((quarter, index) => (
            <option key={index} value={quarter}>
              {quarter}
            </option>
          ))}
        </select>
      </div>
      <button
      onClick={handleRunRiskAnalysisforinput}
      style={{ display: "block", marginBottom: "10px" }}
      disabled={!selectedQuarterForriskinput}
      className={` btn btn-outline btn-primary w-64 btn-sm  ${
        (!selectedQuarterForriskinput) && "text-black"
      }`}
    >
      Run Risk Analysis for input
    </button>

    {/* New Quarter Dropdown for "Quarter from Input" */}
    <div className="flex flex-col gap-y-4">
      <label style={{ marginTop: "20px" }}>Select Quarter for Input:</label>
      <select
        value={selectedQuarterForInput}
        onChange={(e) => setSelectedQuarterForInput(e.target.value)}
        style={{ marginBottom: "10px" }}
        className="select select-bordered w-full max-w-xs select-sm"
      >
        <option value="">Select Quarter for Input</option>
        {quarterList.map((quarter, index) => (
          <option key={index} value={quarter}>
            {quarter}
          </option>
        ))}
      </select>
    </div>
    <button
      onClick={handleRunOutlierfromInput}
      style={{ display: "block", marginBottom: "10px" }}
      disabled={!selectedQuarterForInput}
      className={` btn btn-outline btn-primary w-64 btn-sm  ${
        !selectedQuarterForInput && "text-black"
      }`}
    >
      Outlier from input
    </button>
    <button
      onClick={handleRunKnnOutput}
      style={{ display: "block", marginBottom: "10px" }}
      className=" my-5 btn btn-outline btn-primary w-64 btn-sm "
    >
      Knn Output
    </button>
    {/*quarter dropdown*/}
    <div className="flex gap-x-16">
      <div className="flex flex-col  gap-y-4">
        <label>Select Quarter:</label>
        <select
          value={selectedQuarter2}
          onChange={(e) => setSelectedQuarter2(e.target.value)}
          style={{ marginBottom: "10px" }}
          className="select select-bordered w-full max-w-xs select-sm"
        >
          <option value="">Select Quarter</option>
          {BanklistData.quarterlist.map((quarter, index) => (
            <option key={index} value={quarter}>
              {quarter}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-y-4">
        {/* Bank Dropdown for Bank and Quarter Existing Data */}
        <label>Select Bank:</label>
        <select
          value={selectedBank2}
          onChange={(e) => setSelectedBank2(e.target.value)}
          style={{ marginBottom: "10px" }}
          className="select select-bordered w-full max-w-xs select-sm"
        >
          <option value="">Select Bank</option>
          {BanklistData.bank_list.map((bank, index) => (
            <option key={index} value={bank}>
              {bank}
            </option>
          ))}
        </select>
      </div>
    </div>
    <button
      onClick={handleRunOutlierFromExisting}
      style={{ display: "block", marginBottom: "10px" }}
      disabled={!selectedQuarter2 || !selectedBank2}
      className={`btn btn-outline btn-primary w-64 btn-sm  ${
        (!selectedQuarter2 || !selectedBank2) && "text-black"
      }`}
    >
      Outlier from existing
    </button>
    {/* inputOutlierData["z score compared to all banks in this quarter"] */}
    {inputOutlierData && inputOutlierData.variables && inputOutlierData.quarter && (
      <div className="my-5 w-full h-[500px] overflow-scroll">
        <h1 className="my-3">
          Table from the given input {inputOutlierData.quarter}.
        </h1>
        <table className="table-custom w-150 p-3">
          <thead className="sticky top-0 bg-white">
            <tr>
              <th>Variable</th>
              <th>Value</th>
              <th>Mean for this quarters</th>
              <th>Z score in this quarter</th>
              <th>Mean for all quarters</th>
              <th>Z score in all quarters</th>
              <th>Outlier</th>
            </tr>
          </thead>
          <tbody>
            {inputOutlierData &&
              inputOutlierData.variables &&
              inputOutlierData.quarter &&
              inputOutlierData.variables.map((x, index) => (
                <tr key={index}>
                  <td>{
                    <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip(index)}
                  >
                    <span>{cleaner.capitalizeFirstLetter(x)}</span>
                    </OverlayTrigger>
                  }</td>
                  <td>{cleaner.addCommasToNumber(formatNumberToDecimalPlaces(inputOutlierData.self_value[index],3))}</td>
                  <td>{cleaner.addCommasToNumber(formatNumberToDecimalPlaces(inputOutlierData.quarter_mean[index],3))}</td>
                  <td>
  <OverlayTrigger
    placement="right"
    delay={{ show: 250, hide: 400 }}
    overlay={renderTooltipzscore(index, inputOutlierData['z score compared to all banks in this quarter'][index])}
  >
    <span>
      {inputOutlierData['z score compared to all banks in this quarter'][index]==='nan'?'-':formatNumberToDecimalPlaces(inputOutlierData['z score compared to all banks in this quarter'][index], 4)}
    </span>
  </OverlayTrigger>
</td>
                  <td>
                    {inputOutlierData.totals_mean[index]}
                  </td>
                  <td>
                  <OverlayTrigger
    placement="right"
    delay={{ show: 250, hide: 400 }}
    overlay={renderTooltipzscore(index, inputOutlierData['z score compared to all quarters of all banks'][index])}
  >
                    <span>
                    {
                      inputOutlierData[
                        "z score compared to all quarters of all banks"
                      ][index]==='nan'? '-':formatNumberToDecimalPlaces(inputOutlierData[
                        "z score compared to all quarters of all banks"
                      ][index],4)
                    }
                    </span>
                    </OverlayTrigger>
                  </td>
                  
                  <td
                    className={`border-[1px] ${
                      x === false ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {x === false ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )}

{riskData && riskData.bank && riskData.quarter && (
    <div>
        <table className="table-custom w-150 p-3">
            <thead>
                <tr>
                    <th>Bank</th>
                    <th>Quarter</th>
                    <th>Index compared to all quarters from all banks</th>
                    <th>Index compared to all bank data in given quarter</th>
                    <th>Index compared to all quarters within this bank</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{riskData.bank}</td>
                    <td>{riskData.quarter}</td>
                    <td>
                        {["Capital Adequacy:", "Assets:", "Management Capability:", "Earnings:", "Liquidity:", "Sensitivity:"].map((item, index) => (
                            <div key={index}>{item} {riskData["index compared to all quarters from all banks"][index]}</div>
                        ))}
                    </td>
                    <td>
                        {["Capital Adequacy:", "Assets:", "Management Capability:", "Earnings:", "Liquidity:", "Sensitivity:"].map((item, index) => (
                            <div key={index}>{item} {riskData["index compared to all bank data in given quarter"][index]}</div>
                        ))}
                    </td>
                    <td>
                        {["Capital Adequacy:", "Assets:", "Management Capability:", "Earnings:", "Liquidity:", "Sensitivity:"].map((item, index) => (
                            <div key={index}>{item} {riskData["index compared to all quarters within this bank"][index]}</div>
                        ))}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
)}

{inputRiskData && inputRiskData.quarter && (
    <div>
        <table className="table-custom w-150 p-3">
            <thead>
                <tr>
                    <th>Bank</th>
                    <th>Quarter</th>
                    <th>Index compared to all quarters from all banks</th>
                    <th>Index compared to all bank data in given quarter</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Input Bank</td>
                    <td>{inputRiskData.quarter}</td>
                    <td>
                        {["Capital Adequacy:", "Assets:", "Management Capability:", "Earnings:", "Liquidity:", "Sensitivity:"].map((item, index) => (
                            <div key={index}>{item} {inputRiskData["index compared to all quarters from all banks"][index]}</div>
                        ))}
                    </td>
                    <td>
                        {["Capital Adequacy:", "Assets:", "Management Capability:", "Earnings:", "Liquidity:", "Sensitivity:"].map((item, index) => (
                            <div key={index}>{item} {inputRiskData["index compared to all bank data in given quarter"][index]}</div>
                        ))}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
)}



    
    {outlierData && outlierData.variables && outlierData.quarter && (
      <div className="my-5 w-full h-[500px] overflow-scroll">
        <h1 className="my-3">
          Table from the given input {outlierData.quarter}.
        </h1>
        <table className="table-custom w-150 p-3">
          <thead className="sticky top-0 bg-white">
            <tr>
              <th>Variable</th>
              <th>Value</th>
              <th>Total Mean</th>
              <th>z score compared to all quarters of all banks</th>
              <th>Quarter mean</th>
              <th>z score compared to all banks in this quarter</th>
              
              <th>Outlier</th>
            </tr>
          </thead>
          <tbody>
            {outlierData &&
              outlierData.variables &&
              outlierData.quarter &&
              outlierData.variables.map((x, index) => (
                <tr key={index}>
                  <td> <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip(index)}
                  >
                    <span>{cleaner.capitalizeFirstLetter(x)}</span>
                    </OverlayTrigger></td>
               
                  <td>{cleaner.addCommasToNumber(formatNumberToDecimalPlaces(outlierData.self_value[index],3))}</td>
                  <td>{cleaner.addCommasToNumber(formatNumberToDecimalPlaces(outlierData.totals_mean[index],3))}</td>
                  <td>
                  <OverlayTrigger
    placement="right"
    delay={{ show: 250, hide: 400 }}
    overlay={renderTooltipzscore(index, outlierData['z score compared to all quarters from all banks'][index])}
  >
                    <span>
                    {
                      
                      formatNumberToDecimalPlaces(outlierData[
                        "z score compared to all quarters from all banks"
                      ][index],4)
                    }
                    </span>
                    </OverlayTrigger>
                  </td>
                  <td>{cleaner.addCommasToNumber(formatNumberToDecimalPlaces(outlierData.quarters_mean[index],3))}</td>
                  <td>
                  <OverlayTrigger
    placement="right"
    delay={{ show: 250, hide: 400 }}
    overlay={renderTooltipzscore(index, outlierData['z score compared to all banks in given quarter'][index])}
  >
                    <span>
                    {
                      outlierData[
                        "z score compared to all banks in given quarter"
                      ][index]==='nan'?'-':formatNumberToDecimalPlaces(outlierData[
                        "z score compared to all banks in given quarter"
                      ][index],4)
                    }
                    </span>
                    </OverlayTrigger>
                  </td>
                 
                  {
                    <td
                      className={`border-[1px] ${
                        outlierData["outlier"][index] === true
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {outlierData["outlier"][index] === true ? "Yes" : "No"}
                    </td>
                  }
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )}
    {/**knn here */}
    {knndata && knncomplete && (
  <div className="my-5 w-full h-[500px] overflow-scroll">
    <h1 className="my-3">
      Knn table
    </h1>
    <table className="table-custom w-150 p-3">
      <thead className="sticky top-0 bg-white">
        <tr>
        <th>Input Quarter</th>
          <th>closest bank and quarter</th>
          <th>2nd closest bank and quarter</th>
          <th>3rd closest bank and quarter</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(knndata).map((quarter, index) => (
          <tr key={index}>
            <td>{quarter}</td>
            <td>{knndata[quarter]['1st data'].bank}-{knndata[quarter]['1st data'].quarter}</td>
            <td>{knndata[quarter]['2st data'].bank}-{knndata[quarter]['2st data'].quarter}</td>
            <td>{knndata[quarter]['3st data'].bank}-{knndata[quarter]['3st data'].quarter}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


  </div>
);
};

export default Others;
