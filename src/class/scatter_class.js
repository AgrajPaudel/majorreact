// scatterplot_function.js
class ScatterPlotData {
    constructor(typeOfGraph, jsonData,variable, quarter) {
    // Customize properties based on scatter plot data

    this.type_of_graph = typeOfGraph;
    this.data = jsonData; 
    this.variable = variable;
    this.quarter = quarter
    }

    displayInfo() {
    
    console.log(`Type of Graph: ${this.type_of_graph}`);
    console.log('Data:', this.data);
    console.log('Variable:', this.variable);
    console.log('Quarter:', this.quarter)
  }
}

export default ScatterPlotData;
