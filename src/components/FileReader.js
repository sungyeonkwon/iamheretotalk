import React from 'react';

// process daya here
let lineArrRawData = [];
let dataStorage = {};

function getShuffledArr(arr) {
  let result = [];
  for (let i = arr.length - 1; i >= 0; i --){
    let ranI = Math.floor(Math.random() * arr.length)
    result.push(...arr.splice(ranI, 1))
  }
  return result
}

function getUser(line){
  // console.log("line from getuser", line)
  let regex = /:[0-9][0-9]] [a-zA-Z]+:/ig,
      matched = line.match(regex).toString(),
      user = matched.substring(5, matched.length - 1);
  return user // returns a string
}

function getContent(line){ // refactor this with getUser
  let regex = /.*:[0-9][0-9]] [a-zA-Z]+:/ig,
      matched = line.match(regex).toString(),
      user = matched.substring(5, matched.length - 1);
  return line.substring(matched.length + 1)
}



function getPatternA(line){
  // sentence ending with '!'
  let regex = /\b[A-Z][^\.\!\?\:]{30,}\!/ig,
      matched = line.match(regex)
      if (matched) {
        matched = new Array(matched.toString().substring(0,1).toUpperCase() + matched.toString().substring(1))
      }
  return matched // returns an array
}

// DONE
function getPatternB(line){
  // uppercase only sentence
  let regex = /[^a-z\.\!\?\:]{30,}/g,
      matched = line.match(regex)
  return matched // returns an array
}

function getPatternC(line){
  // because..
  let regex = /because\s[^\.\!\?\:]*[\.]{1}$/ig,
      matched = line.match(regex)
      if (matched) {
        matched = new Array(matched.toString().substring(0,1).toUpperCase() + matched.toString().substring(1))
      }
  return matched // returns an array
}

function getPatternD(line){
  // long sentence
  let regex = /\b[A-Z][^\.\!\?\:]{110,}[\.]{1}$/ig,
      matched = line.match(regex);
  if (matched) {
    matched = new Array(matched.toString().substring(0,1).toUpperCase() + matched.toString().substring(1))
  }
  return matched
}

function getPatternE(line){
  // What do you think?: '(sentence ending) I think...'
  // need to be preceded with [(: )(. )(! )(? )]
  let regex = /([\:\.\!\?] )I think\s[^\.\!\?\:]*[\.]{1}$/ig,
      matched = line.match(regex);
  if (matched) {
    matched = new Array(matched.toString().substring(2,3).toUpperCase() + matched.toString().substring(3))
  }
  return matched
}

function getPatternF(line){
  // What do you want?: '(sentence ending) I want ...'
  let regex = /([\:\.\!\?] )(I want)\s[^\.\!\?\:]*[\.]{1}$/ig,
      matched = line.match(regex);
  if (matched) {
    matched = new Array(matched.toString().substring(2,3).toUpperCase() + matched.toString().substring(3))
  }
  return matched
}

function getPatternG(line){
  // how do you feel?': I feel...
  let regex = /([\:\.\!\?] )(I feel)\s[^\.\!\?\:]*[\.]{1}$/ig,
      matched = line.match(regex);
  if (matched) {
    matched = new Array(matched.toString().substring(2,3).toUpperCase() + matched.toString().substring(3))
  }
  return matched
}

function getPatternH(line){
  // Ask me questions. sentence ending with ?
  let regex = /\b[A-Z][^\.\!\?\:]{30,}\?$/ig,
      matched = line.match(regex);
  if (matched) {
    matched = new Array(matched.toString().substring(0,1).toUpperCase() + matched.toString().substring(1))
  }
  return matched
}


function processData(rawLineData) {

  // console.log("[processData] rawLineData", rawLineData)
  rawLineData.forEach(function(element){

    let userName;
    try {
      userName = getUser(element)
      let resultA = getPatternA(element)
      let resultB = getPatternB(element)
      let resultC = getPatternC(element)
      let resultD = getPatternD(element)
      let resultE = getPatternE(element)
      let resultF = getPatternF(element)
      let resultG = getPatternG(element)
      let resultH = getPatternH(element)

      if (dataStorage[userName]){
        if ( resultA !== null ){
          dataStorage[userName].a.push(...resultA)
        }
        if ( resultB !== null ){
          dataStorage[userName].b.push(...resultB)
        }
        if ( resultC !== null ){
          dataStorage[userName].c.push(...resultC)
        }
        if ( resultD !== null ){
          dataStorage[userName].d.push(...resultD)
        }
        if ( resultE !== null ){
          dataStorage[userName].e.push(...resultE)
        }
        if ( resultF !== null ){
          dataStorage[userName].f.push(...resultF)
        }
        if ( resultG !== null ){
          dataStorage[userName].g.push(...resultG)
        }
        if ( resultH !== null ){
          dataStorage[userName].h.push(...resultH)
        }
      } else {
        dataStorage[userName] = {
          a: [],
          b: [],
          c: [],
          d: [],
          e: [],
          f: [],
          g: [],
          h: [],
        }
        if ( resultA !== null ){
          dataStorage[userName].a.push(...resultA)
        }
        if ( resultB !== null ){
          dataStorage[userName].b.push(...resultB)
        }
        if ( resultC !== null ){
          dataStorage[userName].c.push(...resultC)
        }
        if ( resultD !== null ){
          dataStorage[userName].d.push(...resultD)
        }
        if ( resultE !== null ){
          dataStorage[userName].e.push(...resultE)
        }
        if ( resultF !== null ){
          dataStorage[userName].f.push(...resultF)
        }
        if ( resultG !== null ){
          dataStorage[userName].g.push(...resultG)
        }
        if ( resultH !== null ){
          dataStorage[userName].h.push(...resultH)
        }
      }

    }
    catch(error) {
      console.error("tried to get the uer name BUT ",error);
      userName = "Placeholder"
    }

  });
  console.log("this is the stored data", dataStorage)
  return dataStorage
}


const fileReader = (props) => {

  const fileLoading = () => {
    props.callbackFileLoading()
  }

  const fileLoaded = () => {
    props.callbackFileLoaded()
  }

  const handleFile = (file) => {

    fileLoading();
    const reader = new FileReader();
    reader.onload = (event) => {
        const file = event.target.result;
        const allLines = file.split(/\r\n|\n/);
        // Reading line by line
        allLines.forEach((line) => {
            lineArrRawData = [...lineArrRawData, line]
        });

        // sending data
        let shuffledLineRawData = getShuffledArr(lineArrRawData)
        let finalData = processData(shuffledLineRawData)
        let users = Object.keys(finalData)
        props.callbackFromParent(finalData, users)
        fileLoaded();
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
          onInput={() => fileLoading()}
          onChange={ (e) => handleFile(e.target.files[0]) }
        />
      </div>
  );
};

export default fileReader;
