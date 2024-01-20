import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './BrowsePdf.css';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

class FilePair {
  constructor(file, selectedQuarter) {
    this.file = file;
    this.selectedQuarter = selectedQuarter;
  }
}

const FileRow = ({ filePair, onDelete, onFileChange, onQuarterChange, unavailableQuarters }) => (
  <div className="file-row">
    <input type="file" accept=".pdf, .png, .jpg, .webp" onChange={onFileChange} />
    {filePair.file && (
      <div className="file-preview">
        {/* Render file preview based on file type */}
        {filePair.file.type === 'application/pdf' ? (
          <div className="pdf-container">
            <Document file={filePair.file}>
              <Page pageNumber={1} renderTextLayer={false} />
            </Document>
          </div>
        ) : filePair.file.type.startsWith('image/') ? (
          <img src={URL.createObjectURL(filePair.file)} alt="File Preview" />
        ) : (
          <p>Unsupported file format</p>
        )}
      </div>
    )}

    {/* Dropdown for selecting the quarter */}
    <select onChange={onQuarterChange} value={filePair.selectedQuarter}>
      <option value="">Select Quarter</option>
      {Array.from({ length: 68 }, (_, index) => {
        const year = Math.floor(index / 4) + 2064;
        const quarter = (index % 4) + 1;
        const quarterString = `Q${quarter} ${year}`;
        return (
          <option
            key={index}
            value={quarterString}
            disabled={unavailableQuarters.includes(quarterString)}
          >
            {quarterString}
          </option>
        );
      })}
    </select>

    {/* Delete button */}
    <button onClick={onDelete}>X</button>
  </div>
);

const BrowsePdf = () => {
  const [filePairs, setFilePairs] = useState([]);
  const [showConvertButton, setShowConvertButton] = useState(false);
  const [currentDisplayIndex, setCurrentDisplayIndex] = useState(0);

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    setFilePairs((prevFilePairs) => {
      const updatedFilePairs = [...prevFilePairs];
      updatedFilePairs[index].file = file;
      return updatedFilePairs;
    });
    setShowConvertButton(true);
  };

  const handleQuarterChange = (event, index) => {
    const value = event.target.value;
    setFilePairs((prevFilePairs) => {
      const updatedFilePairs = [...prevFilePairs];
      updatedFilePairs[index].selectedQuarter = value;
      return updatedFilePairs;
    });
  };

  const handleDelete = (index) => {
    setFilePairs((prevFilePairs) => {
      const updatedFilePairs = [...prevFilePairs];
      updatedFilePairs.splice(index, 1);
      return updatedFilePairs;
    });

    // Reset showConvertButton after deletion if no files are left
    if (filePairs.length === 1) {
      setShowConvertButton(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const requestParams1 = {
        access_token: 'z outp', // Replace with the actual access token
       
      };
  
      // Log the JSON being sent to the server
      console.log('Sending JSON to Python:', JSON.stringify(requestParams1));
  
      // Make the API call to the server
      const response = await fetch('/delete-folder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestParams1),
      });

      console.log(await response.text())




      //uploading files
      for (const filePair of filePairs) {
        if (!filePair.selectedQuarter) {
          console.error('Please select a quarter for each file.');
          // Show a dialog box here if needed
          return;
        }

        const formData = new FormData();
        formData.append('file', filePair.file);
        formData.append('access_token', 'z outp');
        formData.append('filename', filePair.file.name);
        formData.append('selectedQuarter', filePair.selectedQuarter);

        const response = await fetch('/upload-pdf', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Access Token:', data.accessToken);
          // Show a success dialog box here if needed
        } else {
          console.error('File upload failed');
          // Show an error dialog box here if needed
        }
      }

      // Show dialog box after all files are uploaded
      alert('File upload complete. You can now operate on them.');

    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  const displayFiles = filePairs.map((pair, index) => (
    <FileRow
      key={index}
      filePair={pair}
      onDelete={() => handleDelete(index)}
      onFileChange={(event) => handleFileChange(event, index)}
      onQuarterChange={(event) => handleQuarterChange(event, index)}
      unavailableQuarters={filePairs.map((fp) => fp.selectedQuarter)}
    />
  ));

  return (
    <div className="container2">
      <h3>Upload image or PDF file (.png, .jpg, .webp, or .PDF)</h3>

      {/* Display files */}
      <div className="file-display">
        {displayFiles[currentDisplayIndex]}
        {/* Add navigation buttons */}
        {filePairs.length > 1 && (
          <div className="file-navigation">
            <button
              onClick={() =>
                setCurrentDisplayIndex((prevIndex) =>
                  prevIndex === 0 ? filePairs.length - 1 : prevIndex - 1
                )
              }
            >
              &lt; Prev
            </button>
            <button
              onClick={() =>
                setCurrentDisplayIndex((prevIndex) =>
                  prevIndex === filePairs.length - 1 ? 0 : prevIndex + 1
                )
              }
            >
              Next &gt;
            </button>
          </div>
        )}
      </div>

      {/* "Plus" button to add new file and quarter pairs */}
      <button
        onClick={() =>
          setFilePairs((prevFilePairs) => [
            ...prevFilePairs,
            new FilePair(null, ''),
          ])
        }
      >
        +
      </button>

      {/* Submit button, disabled if no file or quarter is selected */}
      <button
        onClick={handleSubmit}
        disabled={!filePairs.length || filePairs.some((pair) => !pair.selectedQuarter)}
      >
        Submit
      </button>
    </div>
  );
};

export default BrowsePdf;
