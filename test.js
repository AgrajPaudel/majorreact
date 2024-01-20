const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs-extra');
const { spawn } = require('child_process');

const app = express();
const port = 3001;

app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to execute a Python script
const executePythonScript = (scriptPath, args) => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', [scriptPath, ...args]);

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(`Python script exited with code ${code}`);
            }
        });
    });
};

// /upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    const accessToken = uuidv4();
    const uploadFolder = `E:/majorproject-master/z outp/${accessToken}`;

    const selectedQuarter = req.body.selectedQuarter;

    fs.ensureDirSync(uploadFolder);

    const fileName = selectedQuarter ? `${selectedQuarter}.pdf` : req.file.originalname;
    const filePath = `${uploadFolder}/${fileName}`;
    fs.writeFileSync(filePath, req.file.buffer);

    res.json({ accessToken });
});

// /process-pdf endpoint
app.post('/process-pdf', async (req, res) => {
    try {
        // Assuming you have the token and filename from the request or elsewhere
        const token = req.body.token;
        const filename = req.file.originalname;

        // Execute Python script with dynamic path
        await executePythonScript('path-to-function_opener.py', [token, filename]);

        res.json({ message: 'PDF extraction process initiated successfully.', token });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// New endpoint to handle file copying
// app.post('/copy-file', async (req, res) => {
//     try {
//         const { sourcePath, destinationPath } = req.body;

//         // Add logic to copy the file (replace with your actual logic)
//         fs.copyFileSync(sourcePath, destinationPath);

//         res.json({ message: 'File copied successfully.' });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });
// New endpoint to handle file copying
app.post('/copy-file', async (req, res) => {
    try {
        const { sourcePath, destinationPath } = req.body;

        // Extract the file name from sourcePath
        const fileName = sourcePath.split('/').pop();

        // Update the destination file name with ".pdf" extension
        const destinationFileName = destinationPath.endsWith('.pdf') ? destinationPath : `${destinationPath}/${fileName}`;

        // Add logic to copy the file (replace with your actual logic)
        fs.copyFileSync(sourcePath, destinationFileName);

        res.json({ message: 'File copied successfully.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
