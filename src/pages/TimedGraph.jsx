import React,{useState,useEffect,useRef} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TestNavbar from "../component/TestNavBar";
import BanklistData from "../component/banklist.js";
import Spinner from "react-bootstrap/Spinner";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Form } from "react-bootstrap";
import styled from "styled-components";
//here is new:
import "../component/GraphTest-master/src/styles.css";
import { Modal } from "react-bootstrap";
import LineChartoo from "../component/GraphTest-master/src/nextwebsiteChart"; //this shit useful 

//line
import GraphData  from "../class/classes.js";
//scatter
import ScatterPlotData from "../class/scatter_class.js";
import CreateScatterPlot from "../component/GraphTest-master/src/function/scatter_function.js";
import processQuarters from "../component/GraphTest-master/src/function/scatter_nan.js";
import banklist from "../component/banklist.js";
import GenerateGraph from "../component/GraphTest-master/src/function/combiner_function.js";
import CreateLineChart from "../component/GraphTest-master/src/function/graph_functions.js";



//for styled options
const StyledLabel = styled.label`
  /* Add your label styling here */
  font-family: serif;
  font-size: 22px;
`;


export default function TimedGraph() {

  //information to be displayed in while hovering in the table
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

  const [results,setresults]=useState(null);
  const [selectedQuarter1, setSelectedQuarter1] = useState(null);
  const [selectedBank1, setSelectedBank1] = useState(null);
  const [linechartdata, setlinechartdata]=useState(null);
  const [sData, setSData] = useState({});
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [complete,setcomplete]=useState(false);
  const [soloBank, setSoloBank] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(false);
  const [idata,setIData]=useState({});
  const [combine,setcombine]=useState(false);
  

  var list_of_data=[];
  var scatter_data=[];
  //////
  // State for the quarter list obtained from extract-column-header
  const [quarterList, setQuarterList] = useState([]);
  
  

  // State for the new quarter dropdown
  const [selectedQuarterForInput, setSelectedQuarterForInput] = useState(null);

  // State for the extracted row headers
  const [variables, setvariablesList] = useState([]);
  const [selectedvariableforOutput, setSelectedVariableForOutput] = useState(null);
  //for scatterplot
  const [scatterplotdata, setscatterplotdata]=useState(null);
  const [scattercomplete,setscattercomplete]=useState(false);

  

  //dialog box
  const [isModalOpen, setIsModalOpen] = useState(false);

  //combine table
  const [compareTableData, setCompareTableData] = useState(null);

  // Function to handle comparison and creation of the new table
  const handleCompareTables = () => {
  if (!sData || !idata) {
    console.error("Data not available for comparison");
    return;
  }

  // Find common variables between sData and idata
  const commonVariables = sData.variable.filter((variable) =>
    idata.variable.includes(variable)
  );

  // Filter sData and idata to include only common variables
  const sDataFiltered = sData.variable.reduce((acc, variable, index) => {
    if (commonVariables.includes(variable)) {
      acc[variable] = sData.values[index];
    }
    return acc;
  }, {});

  const idataFiltered = idata.variable.reduce((acc, variable, index) => {
    if (commonVariables.includes(variable)) {
      acc[variable] = idata.values[index];
    }
    return acc;
  }, {});

  // Combine filtered sData and idata into a new array
  const combinedData = commonVariables.map((variable) => ({
    variable,
    sValue: sDataFiltered[variable],
    iValue: idataFiltered[variable],
  }));

  // Update state to render the new table
  setCompareTableData(combinedData);
};

 

  const closeModal = () => {
    // Close the modal
    setIsModalOpen(false);
  };


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

useEffect(() => {
  
  setscattercomplete(true);
}, [scatterplotdata]); // Trigger the effect when scatterplot changes


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
    finally {
      setLoading(false);
    }
  };

  //useffect to handle the Progress Bar
  useEffect(() => {
    if (loading) {
      const totalSteps = (70 * 1000) / 500; // Convert 34 seconds to milliseconds and divide by interval (500 milliseconds)
      let currentStep = 0;
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          currentStep++;
          if (prevProgress >= totalSteps) {
            clearInterval(interval);
            return 100;
          }
          const nextProgress = (currentStep / totalSteps) * 100;
          return parseFloat(nextProgress.toFixed(0));
        });
      }, 500); // Adjust the interval for the progress

      return () => clearInterval(interval);
    }
  }, [loading]);

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
        const result = await response.json();

        // Display the result in your component as needed
        console.log(result);
        setIData(result);

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
        const holder=processQuarters(result,BanklistData.quarterlist);

        const newresult={
          quarter : holder.quarters,
          values : holder.values,
          bank: 'Input Data',
          variable: setSelectedVariableForOutput
        };
        const scatterinstance=new GraphData('Input Data','ScatterPlot',
        newresult,
        setSelectedVariableForOutput,
        );
        scatter_data.push(scatterinstance);

       
      
      
  
        // Add your logic here to handle the result, update state, or perform any other actions
        // For example, you might want to setState or dispatch an action in a Redux store
  
        // Sample logic: Update state with the result
        // updateState(result);
  
        // ... Add more logic as needed
  
      } else {
        // Handle the case where the API call was not successful
        console.error('Error calling the API');
      }

      
      var y=scatter_data;
      console.log(y);


      
      setscatterplotdata(prevData => {
        return y;
      });
      


    } catch (error) {
      // Handle any errors that occur during the API call
      console.error('Error:', error);
    }
  };



  const handleruncombine = async () => {
    if(selectedvariableforOutput!==selectedMetric){
      setIsModalOpen(true);
      return;
    }
    setcombine(true);
    setIsLoading(true);




   console.log('combine');
  };

    //demo for rendering tooltip
  const renderTooltip = (index) => (
    <Tooltip id={`tooltip-${index}`} placement="right">
      {tooltips[index]}
    </Tooltip>
  );


  return (
    <div className="my-10 container">
      <div>
        
        <h1>this is the timed ggggraph</h1>
  
        <div className="flex gap-x-16">
          <div>
            {/* Quarter Dropdown */}
            <div className="flex flex-col my-4 gap-y-4">
              <div className="flex gap-x-10">
                <div className="flex flex-col gap-y-2">
                  <label className="font-bold">Select Quarter:</label>
                  <select
                    value={selectedQuarter1}
                    onChange={(e) => setSelectedQuarter1(e.target.value)}
                    className="select select-bordered w-full max-w-xs select-sm"
                    style={{ marginBottom: "10px" }}
                  >
                    <option value="">Select Quarter</option>
                    {BanklistData.quarterlist.map((quarter, index) => (
                      <option key={index} value={quarter}>
                        {quarter}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-y-2">
                  <label className="font-bold">Select Bank:</label>
                  <select
                    value={selectedBank1}
                    onChange={(e) => setSelectedBank1(e.target.value)}
                    className="select select-bordered w-full max-w-xs select-sm"
                    style={{ marginBottom: "10px" }}
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
  
              {/* Button to run the API call for Bank and Quarter Existing Data */}
              <button
                onClick={handleRunBankAndQuarterFromExisting}
                className={`btn btn-outline btn-primary w-64 btn-sm  ${
                  (!selectedQuarter1 || !selectedBank1) && "text-black"
                }`}
                disabled={!selectedQuarter1 || !selectedBank1}
              >
                Bank and Quarter Existing Data
              </button>
            </div>
  
            {/* Financial Metric Dropdown for Variable and Bank Existing Data */}
            <div className="flex flex-col gap-y-4 my-4">
              <div className="flex flex-col gap-y-2">
                <label className="font-bold">Select Financial Metric:</label>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="select select-bordered w-full max-w-xs select-sm"
                  style={{ marginBottom: "10px" }}
                >
                  <option value="">Select Financial Metric</option>
                  {BanklistData.financial_metrics.map((metric, index) => (
                    <option key={index} value={metric}>
                      {metric}
                    </option>
                  ))}
                </select>
              </div>
  
              {/* Button to run the API call for Variable and Bank Existing Data */}
              <button
                onClick={handleRunVariableAndBankFromExisting}
                className={`btn btn-outline btn-primary w-64 btn-sm  ${
                  !selectedMetric && "text-black"
                }`}
                disabled={!selectedMetric}
              >
                Variable and Bank Existing Data
              </button>
            </div>
  
            {/* New Quarter Dropdown for "Quarter from Input" */}
            <div className="my-4 flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2">
                <label className="font-bold">Select Quarter for Input:</label>
                <select
                  value={selectedQuarterForInput}
                  onChange={(e) => setSelectedQuarterForInput(e.target.value)}
                  className="select select-bordered w-full max-w-xs select-sm"
                  style={{ marginBottom: "10px" }}
                >
                  <option value="">Select Quarter for Input</option>
                  {quarterList.map((quarter, index) => (
                    <option key={index} value={quarter}>
                      {quarter}
                    </option>
                  ))}
                </select>
              </div>
  
              {/* Button to run the API call for Quarter from Input */}
              <button
                onClick={handleRunQuarterfromInput}
                className={`btn btn-outline btn-primary w-64 btn-sm  ${
                  !selectedQuarterForInput && "text-black"
                }`}
                disabled={!selectedQuarterForInput}
              >
                Quarter from Input
              </button>
            </div>
  
            {/* New Variable Dropdown for "Quarter from Input" */}
            <div className="my-4 flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2">
                <label className="font-bold">Select Variable for Input:</label>
                <select
                  value={selectedvariableforOutput}
                  onChange={(e) => setSelectedVariableForOutput(e.target.value)}
                  className="select select-bordered w-full max-w-xs select-sm"
                  style={{ marginBottom: "10px" }}
                >
                  <option value="">Select Variable for Input</option>
                  {variables.map((variable, index) => (
                    <option key={index} value={variable}>
                      {variable}
                    </option>
                  ))}
                </select>
              </div>
  
              {/* Button to run the API call for Variable from Input */}
              <button
                onClick={handleRunVariablefromInput}
                className={`btn btn-outline btn-primary w-64 btn-sm  ${
                  !selectedvariableforOutput && "text-black"
                }`}
                disabled={!selectedvariableforOutput}
              >
                Variable from Input
              </button>
            </div>
          </div>
  
          {/* Loading Progress */}
          {loading && (
            <div style={{ width: "900px" }}>
              <ProgressBar animated now={progress} label={`${progress}%`} />
            </div>
          )}
  
          {/* Render the Line Chart based on the resultData */}
          {linechartdata && complete && (
            <div className="my-4">
              <CreateLineChart data={linechartdata} />
            </div>
          )}
  
          {/* Render the Scatter Plot based on the scatterplotData */}
          {scatterplotdata && scattercomplete && (
            <CreateScatterPlot data={scatterplotdata} />
          )}
  
          {/* Button to run the API call for Variable from Input */}
          <button
            onClick={handleruncombine}
            style={{
              display:
                selectedvariableforOutput && selectedMetric && scatterplotdata && linechartdata
                  ? "block"
                  : "none",
              marginBottom: "10px",
            }}
            disabled={
              !selectedvariableforOutput ||
              !selectedMetric ||
              !scatterplotdata ||
              !linechartdata
            }
          >
            Combine Graph
          </button>
          
                    {/* Render the Scatter Plot based on the scatterplotData */}
                    {scatterplotdata && scattercomplete && linechartdata && complete && combine &&(
            <GenerateGraph lineData={linechartdata} scatterData={scatterplotdata}/>
          )}
  
          {/* Modal */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Variable Mismatch"
          >
            <h2>Variable Mismatch</h2>
            <p>The selected variable for output does not match the selected metric.</p>
            <button onClick={closeModal}>OK</button>
          </Modal>
        </div>
  
        {/* Table for sData */}
        {sData && sData.variable && sData.values && (
          <div className="my-5">
            <h1 className="my-3">Table for {sData.bank} of {sData.quarter}.</h1>
            <table className="table-custom w-150 p-3">
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
                      <td>
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip(index)}
                        >
                          <span>{sData.values[index]==='nan'?'-':sData.values[index]}</span>
                        </OverlayTrigger>
                      </td>
                    </tr>
                  ))}
                {/*idata*/ }
                {idata && idata.variable  && (
          <div className="my-5">
            <h1 className="my-3">
              Table from the given input {idata.quarter}.
            </h1>
            <table className="table-custom w-150 p-3">
              <thead>
                <tr>
                  <th>Variable</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {idata &&
                  idata.variable &&
                  idata.values &&
                  idata.variable.map((x, index) => (
                    <tr key={index}>
                      <td>{x}</td>
                      <td>
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip(index)}
                        >
                          <span>{idata.values[index]==='nan'?'-':idata.values[index]}</span>
                        </OverlayTrigger>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

              </tbody>
            </table>
          </div>
        )}

        {/* Button to compare tables */}
      <button onClick={handleCompareTables} className="btn btn-primary">
        Compare Tables
      </button>

      {/* Render the comparison table if compareTableData is available */}
      {compareTableData && (
        <div className="my-5">
          <h1 className="my-3">Comparison Table</h1>
          <table className="table-custom w-150 p-3">
            <thead>
              <tr>
                <th>Variable</th>
                <th>Dataset Value</th>
                <th>Input Value</th>
              </tr>
            </thead>
            <tbody>
              {compareTableData.map((data, index) => (
                <tr key={index}>
                  <td>{data.variable}</td>
                  <td>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip(index)}
                    >
                      <span>{data.sValue === 'nan' ? '-' : data.sValue}</span>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip(index)}
                    >
                      <span>{data.iValue === 'nan' ? '-' : data.iValue}</span>
                    </OverlayTrigger>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </div>
  );
  
}


