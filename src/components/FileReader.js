import React from 'react';
import FakeData from './FakeData';


let processedData = [];

const fileReader = (props) => {

  const handleFile = (file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
          const file = event.target.result;
          const allLines = file.split(/\r\n|\n/);
          // Reading line by line
          allLines.forEach((line) => {
              // put the data in to the array
              processedData = [...processedData, line]
          });
          // console.log("all processed data: FINAL PRODUCT", processedData)
          props.callbackFromParent(processedData)
      };
      reader.onerror = (event) => {
          alert(event.target.error.name);
      };
      reader.readAsText(file);
  }



  return (
      <div className="upload">
        <input
          type="file"
          id="file"
          className="input-file"
          accept=".txt"
          onChange={ (e) => handleFile(e.target.files[0]) }
        />
      </div>
  );
};

export default fileReader;
