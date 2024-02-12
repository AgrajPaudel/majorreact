import React,{useState,useEffect} from "react";
import TestNavbar from "../component/TestNavBar";
import BanklistData from "../component/banklist.js";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

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





return (
  <div className=" my-10 container">
    <TestNavbar></TestNavbar>
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
    {outlierData && outlierData.variables && outlierData.quarter && (
      <div className="my-5 w-full h-[500px] overflow-scroll">
        <h1 className="my-3">
          Table from the given input {inputOutlierData.quarter}.
        </h1>
        <table className="table-custom w-150 p-3">
          <thead className="sticky top-0 bg-white">
            <tr>
              <th>Variable</th>
              <th>z score compared to all quarters of all banks</th>
              <th>z score compared to all banks in this quarter</th>
              <th>Outlier</th>
            </tr>
          </thead>
          <tbody>
            {inputOutlierData &&
              inputOutlierData.variables &&
              inputOutlierData.quarter &&
              inputOutlierData.variables.map((x, index) => (
                <tr key={index}>
                  <td>{x}</td>
                  <td>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip(index)}
                    >
                      <span>
                        {
                          inputOutlierData[
                            "z score compared to all quarters of all banks"
                          ][index]==='nan'? '-':inputOutlierData[
                            "z score compared to all quarters of all banks"
                          ][index]
                        }
                      </span>
                    </OverlayTrigger>
                  </td>
                  <td>
                    {
                      inputOutlierData[
                        "z score compared to all banks in this quarter"
                      ][index]==='nan'? '-':inputOutlierData[
                        "z score compared to all banks in this quarter"
                      ][index]
                    }
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

    {riskData && riskData.quarter && riskData.bank && (
      <div>
        <table className="table-custom w-150 p-3">
          <tr>
            <th>Prameters</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>Quarter</td>
            <td>{riskData.quarter}</td>
          </tr>
          <tr>
            <td>Bank</td>
            <td>{riskData.bank}</td>
          </tr>
          <tr>
            <td>index compared to all quarters from all banks</td>
            <td>
              {riskData["index compared to all quarters from all banks"]}
            </td>
          </tr>
          <tr>
            <td>index compared to all bank data in given quarter</td>
            <td>
              {riskData["index compared to all bank data in given quarter"]}
            </td>
          </tr>
          <tr>
            <td>index compared to all quarters within this bank</td>
            <td>
              {riskData["index compared to all quarters within this bank"]}
            </td>
          </tr>
        </table>
      </div>
    )}

    {/* <div className="w-full h-[400px] overflow-scroll">
      {outlierData.variables && (
        <div className="flex mt-8 ">
          <div>
            <h1 className="text-center " style={{ height: "3.8rem" }}>
              Variables
            </h1>
            <ul className=" w-72">
              {outlierData &&
                outlierData.variables &&
                outlierData.variables.map((variable, index) => (
                  <li key={index} className="border-b ">
                    {variable}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h1
              className="text-center px-2"
              style={{ height: "3.8rem", fontSize: "1rem" }}
            >
              z score compared to all quarters from all banks
            </h1>
            <ul>
              {outlierData &&
                outlierData[
                  "z score compared to all quarters from all banks"
                ] &&
                outlierData[
                  "z score compared to all quarters from all banks"
                ].map((x, index) => <li className="border-[1px]">{x}</li>)}
            </ul>
          </div>
          <div>
            <h1
              className="text-center"
              style={{ height: "3.8rem", fontSize: "1rem" }}
            >
              z score compared to all banks in given quarter
            </h1>
            <ul className="">
              {outlierData &&
                outlierData[
                  "z score compared to all banks in given quarter"
                ] &&
                outlierData[
                  "z score compared to all banks in given quarter"
                ].map((x, index) => <li className="border-[1px]">{x}</li>)}
            </ul>
          </div>
          <div>
            <h1
              className="text-center "
              style={{ height: "3.8rem", fontSize: "1rem" }}
            >
              z score compared to all quarters of given bank
            </h1>
            <ul className="">
              {outlierData &&
                outlierData[
                  "z score compared to all quarters of given bank"
                ] &&
                outlierData[
                  "z score compared to all quarters of given bank"
                ].map((x, index) => <li className="border-[1px]">{x}</li>)}
            </ul>
          </div>
          <div>
            <h1
              className="text-center"
              style={{ height: "3.8rem", fontSize: "1rem" }}
            >
              outlier
            </h1>
            <ul className="">
              {outlierData &&
                outlierData["outlier"] &&
                outlierData["outlier"].map((x, index) => (
                  <li
                    className={`border-[1px] ${
                      x === false ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {x === false ? "No" : "Yes"}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div> */}
    {outlierData && outlierData.variables && outlierData.quarter && (
      <div className="my-5 w-full h-[500px] overflow-scroll">
        <h1 className="my-3">
          Table from the given input {outlierData.quarter}.
        </h1>
        <table className="table-custom w-150 p-3">
          <thead className="sticky top-0 bg-white">
            <tr>
              <th>Variable</th>
              <th>z score compared to all quarters of all banks</th>
              <th>z score compared to all banks in this quarter</th>

              <th>Bank</th>
            </tr>
          </thead>
          <tbody>
            {outlierData &&
              outlierData.variables &&
              outlierData.quarter &&
              outlierData.variables.map((x, index) => (
                <tr key={index}>
                  <td>{x}</td>
                  <td>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip(index)}
                    >
                      <span>
                        {
                          outlierData[
                            "z score compared to all quarters from all banks"
                          ][index]==='nan'?'-':outlierData[
                            "z score compared to all quarters from all banks"
                          ][index]
                        }
                      </span>
                    </OverlayTrigger>
                  </td>
                  <td>
                    {
                      outlierData[
                        "z score compared to all banks in given quarter"
                      ][index]==='nan'?'-':outlierData[
                        "z score compared to all banks in given quarter"
                      ][index]
                    }
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
  </div>
);
};

export default Others;
