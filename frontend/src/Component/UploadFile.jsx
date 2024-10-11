import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
// import Papa from "papaparse";
import axios from 'axios'

const CsvUpload = () => {
  const [csvData, setCsvData] = useState(null); // To store the parsed CSV data
  const [fileName, setFileName] = useState(""); // To display the selected file name

  // Handle file change event
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      parseCsv(file);
    }
  };


  const handleData = (event) => {
    axios.get('http://localhost:8000/data').then((res)=> {
      setCsvData(res.data)
    }).catch((err) => {
      console.log(err);
      
    })
  };

  const parseCsv = (file) => {
    const formdata = new FormData();
    formdata.append('file', file)
        axios.post('http://localhost:8000/upload', formdata, {Headers: {
          "Content-Type": "multpart/form-data"
        }}).then((res)=> {
          console.log("response",res);
          setCsvData((prev)=> res.data)
          
        }).catch((err)=> {
          console.log("error ", err);
          
        })
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload CSV File</h2>

      {/* File Input */}
      <TextField
        variant="outlined"
        type="file"
        inputProps={{ accept: ".csv" }} // Only allow CSV files
        onChange={handleFileChange}
        InputProps={{
          endAdornment: (
            <Button
              variant="contained"
              component="span"
            >
              Upload
            </Button>
          ),
        }}
        style={{ marginBottom: "20px" }}
      />

      {/* Display Selected File Name */}
      {fileName && <p>Selected File: {fileName}</p>}

      {/* Render Parsed CSV Data */}
      <button onClick={handleData}>Get Data</button>
      {csvData && (
        <div>
          <h3>Parsed CSV Data:</h3>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                {Object.keys(csvData[0]).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CsvUpload;
