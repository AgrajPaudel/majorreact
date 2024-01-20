import React, { useState } from 'react';

const BrowsePdf = () => {
    const [file, setFile] = useState(null);
    const [showConvertButton, setShowConvertButton] = useState(false);
    const [selectedQuarter, setSelectedQuarter] = useState(''); // New state for selected quarter

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setShowConvertButton(true);
    };

    const handleQuarterChange = (event) => {
        setSelectedQuarter(event.target.value);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('selectedQuarter', selectedQuarter);

        try {
            const response = await fetch('http://localhost:3001/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Access Token:', data.accessToken);
            } else {
                console.error('File upload failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleConvertPDF = async () => {
        // Existing code for initiating PDF extraction process

        // New code for copying the file
        const response = await fetch('http://localhost:3001/process-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.message);

            // Assuming you have the token from the previous upload
            const token = data.token;

            // Update the filename with the selected quarter
            const filename = selectedQuarter ? `${selectedQuarter}.pdf` : file.name;

            // Add logic to copy the file to another location
            const sourcePath = `E:/majorproject-master/z outp/${token}/${filename}`;
            const destinationPath = 'path/to/destination/folder';

            // Implement file copying logic (replace with your actual logic)
            // For example, you can use the fetch API to request the server to copy the file
            await fetch('http://localhost:3001/copy-file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sourcePath,
                    destinationPath,
                }),
            });

            console.log('File copied successfully.');
        } else {
            console.error('Failed to initiate PDF extraction process.');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            
            {/* Dropdown for selecting the quarter */}
            <select onChange={handleQuarterChange} value={selectedQuarter}>
                <option value="">Select Quarter</option>
                {['Q1 2064', 'Q2 2064', 'Q3 2064', 'Q4 2064', /*... add more quarters ...*/].map((quarter) => (
                    <option key={quarter} value={quarter}>
                        {quarter}
                    </option>
                ))}
            </select>

            <button onClick={handleSubmit}>Submit File</button>

            {showConvertButton && (
                <button onClick={handleConvertPDF}>Convert PDF to CSV</button>
            )}
        </div>
    );
};

export default BrowsePdf;
