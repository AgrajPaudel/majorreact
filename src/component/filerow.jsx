import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

/* eslint-disable react/prop-types */
const FileRow = ({
  filePair,
  onDelete,
  onFileChange,
  onQuarterChange,
  unavailableQuarters,
}) => {
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <input
            type="file"
            accept=".pdf, .png, .jpg, .webp"
            onChange={onFileChange}
          />
          {/* Delete button */}
          <button onClick={onDelete}>X</button>
          <select
            className="mt-4 select select-bordered w-full max-w-xs select-sm"
            onChange={onQuarterChange}
            value={filePair.selectedQuarter}
          >
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
        </div>
        {filePair.file && (
          <div className="my-3 flex justify-center">
            {/* Render file preview based on file type */}
            {filePair.file.type === "application/pdf" && (
              <Document file={filePair.file}>
                <Page width={500} pageNumber={1} renderTextLayer={false} />
              </Document>
            )}
          </div>
        )}
      </div>
      {/* Dropdown for selecting the quarter */}
    </div>
  );
};

export default FileRow;