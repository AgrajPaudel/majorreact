const fs = require('fs');
const path = require('path');

// Function to execute and handle the upload-pdf request
function executeuploadpdf(requestParams) {
    const { access_token, file } = requestParams;
    let { filename } = requestParams; // Preserve the original filename
    const { selectedQuarter } = requestParams; // Extract selectedQuarter from form
    console.log(requestParams)
    console.log(access_token)
    console.log(filename)
    // If selectedQuarter is provided, update the filename
    if (selectedQuarter) {
        // Extract the file extension
        const fileExtension = path.extname(filename);

        // Generate the new filename with selectedQuarter and the original extension
        filename = `${selectedQuarter}${fileExtension}`;
    }

    // Define the base path
    const basePath = path.join('D:/python tesseract', access_token);

    // Ensure the directory exists, create it if not
    if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
    }

    // Define the full file path
    const filePath = path.join(basePath, filename);

    try {
        // Save the file content to the specified path
        fs.writeFileSync(filePath, file);

        // Return success message
        return { message: 'File uploaded successfully' };
    } catch (error) {
        // Handle errors if any
        console.error('Error saving file:', error);
        throw new Error('Failed to save the file');
    }
}

module.exports = executeuploadpdf;
