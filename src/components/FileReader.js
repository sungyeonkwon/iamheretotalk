import React from 'react';
import FileDrop from 'react-file-drop';

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

// remove emoji
function removeEmojis(string) {
  var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  return string.replace(regex, '');
}

// get username
function getUser(line){
  line = removeEmojis(line)
  let regex = /:[0-9][0-9]] [a-zA-Z]+:/ig,
      matched = line.match(regex).toString(),
      user = matched.substring(5, matched.length - 1);
  return user // returns a string
}

// sentence ends with '!'
function getPatternA(line){
  let regex = /\b[A-Z][^.!?:]{25,}!/ig,
      matched = line.match(regex)
      if (matched) {
        matched = new Array(matched.toString().substring(0,1).toUpperCase() + matched.toString().substring(1))
      }
  return matched 
}

// sentence uppercase only
function getPatternB(line){
  let regex = /[^a-z.!?:]{25,}/g,
      matched = line.match(regex)
  return matched 
}

// sentence starts with 'because'
function getPatternC(line){
  let regex = /because\s[^.!?:]*[.!\n]{1}$/ig,
      matched = line.match(regex)
      if (matched) {
        matched = new Array(matched.toString().substring(0,1).toUpperCase() + matched.toString().substring(1))
      }
  return matched 
}

// long narrative sentence
function getPatternD(line){
  let regex = /\b[A-Z][^.!?:]{110,}[.!\nA-Z]{1}$/ig,
      matched = line.match(regex);
  if (matched) {
    matched = new Array(matched.toString().substring(0,1).toUpperCase() + matched.toString().substring(1))
  }
  return matched
}

// sentence starts with 'I think'
function getPatternE(line){
  let regex = /\W( I think)\s[^.!?:]*[.!\nA-Z]{1}$/ig,
      matched = line.match(regex);
  if (matched) {
    matched = new Array(matched.toString().substring(2,3).toUpperCase() + matched.toString().substring(3))
  }
  return matched
}

// sentence starts with 'I want'
function getPatternF(line){
  let regex = /\W( I want)\s[^.!?:]*[.!\nA-Z]{1}$/ig,
      matched = line.match(regex);
  if (matched) {
    matched = new Array(matched.toString().substring(2,3).toUpperCase() + matched.toString().substring(3))
    if (matched.toString().length >= 11) return matched
  }
  return null
}

// sentence starts with 'I feel'
function getPatternG(line){
  let regex = /\W( I feel)\s[^.!?:]*[.!\nA-Z]{1}$/ig,
      matched = line.match(regex);
  if (matched) {
    matched = new Array(matched.toString().substring(2,3).toUpperCase() + matched.toString().substring(3))
    if (matched.toString().length >= 12) return matched
  }
  return null
}

// emoji only
function getPatternH(line){
  // how do you *really* feel?
  let regex = /[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]/g,
  matched = line.match(regex);
  return matched
}

// sentence ends with '?'
function getPatternI(line){
  let regex = /\b[A-Z][^.!?:]{25,}\?$/ig,
      matched = line.match(regex);
  if (matched) {
    matched = new Array(matched.toString().substring(0,1).toUpperCase() + matched.toString().substring(1))
  }
  return matched
}

// url
function getPatternJ(line){
  let regex = /(www\.|http:|https:)+[^\s]+[\w]/ig,
      matched = line.match(regex);
  return matched
}

// sentence starts with 'It means'
function getPatternK(line){
  let regex = /(means)\s[^.!?:]*[.!\nA-Z]{1}$/ig,
      matched = line.match(regex);
  if (matched) {
    matched = ['It ' + matched]
  }
  return matched
}

// sentence starts with 'I love'
function getPatternL(line){
  // what do you love?
  let regex = /\W( I love)\s(?!it)(?!this)[^.!?:]*[.!\nA-Z]{1}$/ig,
      matched = line.match(regex);
  if (matched) {
    matched = new Array(matched.toString().substring(2,3).toUpperCase() + matched.toString().substring(3))
    if (matched.toString().length >= 10) return matched
  }
  return null
}

// sentence starts with 'you are'
function getPatternM(line){
  let regex = /\W( you are)\s[^.!?:]*[.!\nA-Z]{1}$/ig,
      matched = line.match(regex);
  if (matched) {
    matched = new Array(matched.toString().substring(2,3).toUpperCase() + matched.toString().substring(3))
    if (matched.toString().length >= 12) return matched
  }
  return null
}

function pushPattern(element, func, id, data, user ) {
  // element: each raw line string
  // func: pattern func
  // id: pattern id
  // data: obj to store processed data
  // user: string
  let result = func(element)
  if (result !== null ){
    if (data[user]){
      if(data[user][id]){
        data[user][id].push(...result)
      } else {
        data[user][id] = []
      }
    } else {
      data[user] = {};
    }
  }
}

function processData(rawLineData) {

  rawLineData.forEach(function(element){

    let userName;
    try {
      userName = getUser(element)
      pushPattern(element, getPatternA, 'a', dataStorage, userName)
      pushPattern(element, getPatternB, 'b', dataStorage, userName)
      pushPattern(element, getPatternC, 'c', dataStorage, userName)
      pushPattern(element, getPatternD, 'd', dataStorage, userName)
      pushPattern(element, getPatternE, 'e', dataStorage, userName)
      pushPattern(element, getPatternF, 'f', dataStorage, userName)
      pushPattern(element, getPatternG, 'g', dataStorage, userName)
      pushPattern(element, getPatternH, 'h', dataStorage, userName)
      pushPattern(element, getPatternI, 'i', dataStorage, userName)
      pushPattern(element, getPatternJ, 'j', dataStorage, userName)
      pushPattern(element, getPatternK, 'k', dataStorage, userName)
      pushPattern(element, getPatternL, 'l', dataStorage, userName)
      pushPattern(element, getPatternM, 'm', dataStorage, userName)

    }
    catch(error) { // multiple line cases, ignore it for now
      // console.error("Tried to get the uer name BUT ", error, element);
    }

  });
  // console.log("Final processed data: ", dataStorage)
  return dataStorage
}


const fileReader = (props) => {

  let isFileValid = true;
  let uploaded;

  const fileLoading = () => {
    props.callbackFileLoading()
  }

  const fileLoaded = (result) => {
    props.callbackFileLoaded(result)
  }

  const handleFileDrop = (event, file) => {

    fileLoading();
    const reader = new FileReader();

    reader.onload = (event) => {
        const file = event.target.result;
        const allLines = file.split(/\r\n|\n/);

        // Read line by line
        allLines.forEach((line) => {
            lineArrRawData = [...lineArrRawData, line]
        });

        // Send data
        let shuffledLineRawData = getShuffledArr(lineArrRawData)
        let finalData = processData(shuffledLineRawData)
        let users = Object.keys(finalData)
        props.callbackFromParent(finalData, users)
        console.log("CHECK ", users)

        // Check if the data is valid
        let success = "(a) Proceed to start a conversation."
        let failure = "File seems to be odd."
        if (users === undefined || users.length === 0) {
          isFileValid = false;
          changeFileLog(isFileValid);
          fileLoaded(failure)
        } else {
          changeFileLog(isFileValid);
          fileLoaded(success)
        }
    };
    reader.onerror = (event) => {
        alert(event.target.error.name);
    };
    reader.readAsText(file.dataTransfer.files[0]);
  }

  // When uploaded == true, change style and text
  const changeFileLog = (isFileValid) =>{
    if (props.uploaded){
      if (isFileValid){
        console.log("props.uploaded", props.uploaded)
        uploaded = 'uploaded'
      } else {
        uploaded = 'uploaded'
      }
    }
  }

  // Garbage collection for the data
  if (props.collGarbage) {
    dataStorage = {};
  }

  return (
      <div className={props.zoneUploaded}>
        <div id="react-file-drop" className = {uploaded}>
          <FileDrop
            onDrop={ (event,file) => handleFileDrop(event, file) }
            onFrameDrop={() => fileLoading()} >
            {props.zoneTextChange}
          </FileDrop>
        </div>
      </div>
  );
};

export default fileReader;
