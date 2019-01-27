import React from 'react';
import FakeData from './FakeData';

// process daya here
let lineArrRawData = [];
let dataStorage = {};

// DONE
function getUser(line){
  console.log("line from getuser", line)
  let regex = /:[0-9][0-9]] [a-zA-Z]+:/ig,
      matched = line.match(regex).toString(),
      user = matched.substring(5, matched.length - 1);
  return user // returns a string
}

// DONE
function getContent(line){ // refactor this with getUser
  let regex = /.*:[0-9][0-9]] [a-zA-Z]+:/ig,
      matched = line.match(regex).toString(),
      user = matched.substring(5, matched.length - 1);
  return line.substring(matched.length + 1)
}

// DONE
function getPatternA(line){
  // uppercase only sentence
  let regex = /([A-Z]{2,}\s*)+/g,
      matched = line.match(regex)
  return matched // returns an array
}

// DONE
function getPatternB(line){
  // sentence ending with '!'
  let regex = /([\w]\s*)+\!/ig,
      matched = line.match(regex)
  return matched // returns an array
}

// DONE
function getPatternC(line){
  // sentence ending with '!'
  let regex = /because(\w*\s*)*(\W)/ig,
      matched = line.match(regex)
  return matched // returns an array
}

// DONE
function getPatternD(line){
  // long sentence
  let regex = /\b[A-Z][^\.\!\?\:]*[\.]/ig;
  let found = line.match(regex);
  return found
}


function processData(rawLineData) {

  console.log("[processData] rawLineData", rawLineData)
  rawLineData.forEach(function(element){


    let userName;
    try {
      userName = getUser(element)
    }
    catch(error) {
      console.error("tried to get the uer name BUT ",error);
      userName = "Placeholder"
    }
    let resultA = getPatternA(element)
    let resultB = getPatternB(element)
    let resultC = getPatternC(element)
    let resultD = getPatternD(element)

    if (dataStorage[userName]){
      if ( resultA !== null ){
        console.log("WHAT", dataStorage[userName])
        console.log("WHAT", dataStorage)
        dataStorage[userName].a.push(...resultA)
      }
      if ( resultB !== null ){
        dataStorage[userName].a.push(...resultB)
      }
      if ( resultC !== null ){
        dataStorage[userName].a.push(...resultC)
      }
      if ( resultD !== null ){
        dataStorage[userName].a.push(...resultD)
      }
    } else {
      dataStorage[userName] = {
        a: [],
        b: [],
        c: [],
        d: [],
      }
      if ( resultA !== null ){
        dataStorage[userName].a.push(...resultA)
      }
      if ( resultB !== null ){
        dataStorage[userName].a.push(...resultB)
      }
      if ( resultC !== null ){
        dataStorage[userName].a.push(...resultC)
      }
      if ( resultD !== null ){
        dataStorage[userName].a.push(...resultD)
      }
    }
  });
  console.log("this is the stored data", dataStorage)
  return dataStorage
}


const fileReader = (props) => {

  const handleFile = (file) => {

    const reader = new FileReader();
    reader.onload = (event) => {
        const file = event.target.result;
        const allLines = file.split(/\r\n|\n/);
        // Reading line by line
        allLines.forEach((line) => {
            // put the data in to the array
            lineArrRawData = [...lineArrRawData, line]

        });
        // console.log("all processed data: FINAL PRODUCT", processedData)
        props.callbackFromParent(processData(lineArrRawData))
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
