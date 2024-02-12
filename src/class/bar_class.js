class BarChartData{
    constructor(bankNames, typeOfGraph, jsonData, variable, quarter){
        this.bank_name = bankNames;
        this.typeOfGraph = typeOfGraph;
        this.data= jsonData;
        this.variable =  variable; //metric
        this.quarter = quarter;
    }

    displayInfo(){
    console.log(`Bank Name: ${this.bank_name}`);
    console.log(`Type of Graph: ${this.typeOfGraph}`);
    console.log('Data:', this.data); 
    console.log('Variable:', this.variable);
    console.log('Quarter:', this.quarter)

    }
}

export default BarChartData;