const fs = require('fs');
const path = require('path');

// Function to execute and handle the extract_column_header request
function executeExtractColumnHeader(requestParams) {
  const { access_token, filename } = requestParams;
  
  // Define the base path
  const basePath = path.join('D:/python tesseract', access_token);

  // Function to filter filenames by extension
  const filterByExtension = (extension) => {
    const files = fs.readdirSync(basePath);
    return files
      .filter(file => path.extname(file).toLowerCase() === extension)
      .map(file => path.parse(file).name);
  };

  // Get filenames for each extension
  const pdfFiles = filterByExtension('.pdf');
  const jpgFiles = filterByExtension('.jpg');
  const pngFiles = filterByExtension('.png');

  // Combine unique filenames from different extensions
  const uniqueFilenames = Array.from(new Set([...pdfFiles, ...jpgFiles, ...pngFiles]));

  // Create the result JSON
  const resultContent = {
    columns: uniqueFilenames
  };

  
  return resultContent;
}

module.exports = executeExtractColumnHeader;
