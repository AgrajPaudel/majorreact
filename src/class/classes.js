class GraphData {
    constructor(bankName, typeOfGraph, jsonData,variable) {
      this.bank_name = bankName;
      this.type_of_graph = typeOfGraph;
      this.data = jsonData; 
      this.variable = variable;
    }
  
    displayInfo() {
      console.log(`Bank Name: ${this.bank_name}`);
      console.log(`Type of Graph: ${this.type_of_graph}`);
      console.log('Data:', this.data);
      console.log('Variable:', this.variable);
    }
  }

export default GraphData;