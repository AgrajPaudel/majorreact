// Function to capitalize the first letter of each word in a string
function capitalizeFirstLetter(str) {
    return str.replace(/\b\w/g, function(char) {
        return char.toUpperCase();
    });
}

// Function to add commas to a numerical value
function addCommasToNumber(num) {
    // Convert the number to a string
    let numStr = num.toString();
    
    // Split the number into integer and decimal parts
    let parts = numStr.split('.');
    
    // Add commas to the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    // Join the parts back together with the decimal point
    return parts.join('.');
}

// Exporting the functions
export default {
    capitalizeFirstLetter,
    addCommasToNumber
};