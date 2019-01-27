import React, { Component } from 'react';
import './App.css';

import Layout from './components/Layout';
import Terminal from './containers/Terminal';
import Prompt from './components/Prompt'
import ChatLine from './components/ChatLine'
import Chat from './containers/Chat';

import FakeData from './components/FakeData';
import FileReader from './components/FileReader'

//////////////////////////////////////////////////////////////////


const testRawData = [
  "[27/10/2018, 13:45:30] Sung: So I am proactively doing this thing to resolve the isse #2 from your list",
  "[27/10/2018, 13:45:30] Sung: Oh my god! Did you really do that? Really? I BELIEVE IT",
  "[27/10/2018, 13:45:30] Sung: I'll never meet the ground",
  "[27/10/2018, 13:45:30] Sung: We're far from the shallow WE ARE FAR FROM THE SHALLOW",
  "[27/10/2018, 13:45:30] dlwwlak: I think it's HAHAHAHA GOOD LAUGH really not that complicated (it's very simple)",
  "[27/10/2018, 13:45:30] Sung: it has really come to a point",
  "[27/10/2018, 13:45:30] Sung: Tell me something that I can relate to!",
  "[27/10/2018, 13:45:30] Sung: Are you content",
  "[27/10/2018, 13:45:30] Sung: I find myself belonged to this world",
  "[27/10/2018, 13:45:30] Whadlwwlaktever: OH DEAR",
]


const testData = {
  "lizard" : {
      "a":[
        "so mafawfawfawfawfawfawfawfawfawfaany things seem filled with the intent",
        "The art of losing isn’t hard to master;",
        "to be lost that their loss is no disaster.",
      ],
      "b":[
        "Taaaing isn’t hard to master;",
        "so many things seem filled with the intent",
        "to be lost that their loss is no disaster.",
      ],
      "c":[
        "to be lost that their loss is no disaster.",
        "The art of losing isn’t hard to master;",
        "so many things seem filled with the intent",
      ],
      "d":[
        "so many things seem filled with the intent",
        "to be lost that their loss is no disaster.",
      ],
    }
}

let testDataStorage = {
};

// DONE
function getUser(line){
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


let optionCount = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
}

//////////////////////////////////////////////////////////////////

console.log("PLEASE FileReader.fakeDataFromReader", typeof FileReader)

class App extends Component {


  // regulates the sequence, userinput
  state = {
      userInput: '',
      userAnswer: '',
      prevSeq: 'Landing',
      currSeq: 'Landing',
      nextSeq: '',
      backontrackseq: 'Landing',
      Landing: {
        a: 'Info',
        b: 'Upload',
      },
      Info: {
        a: 'Upload',
      },
      Upload: {
        done: 'Person',
      },
      Person: {
        a: 'Ready',
        b: 'Ready',
      },
      Ready: {
        a: 'Talk',
        b: 'Person',
      },
      Talk: {
        restart: 'Landing',
      },
      Invalid: {
        start: 'Landing',
        back: ''
      },
      renderSeq: 'Landing',
      chatContent: [
        'I\'m here to talk.',
        'Blueberry Placeholder',
        'Sheme',
      ],
      optionToRender: null,
  };

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  inputChangedHandler = (event) => {
    this.setState({userInput: event.target.value})
  }

  keyPressedHandler = (event) => {
    let key = event.keyCode || event.which;
    if (key === 13){
      let userAnswer = event.target.value.toLowerCase();
      this.setState({userAnswer:userAnswer})

      // if currseq is chat, get optiontorender
      if (this.state.currSeq === 'Talk' && userAnswer !== 'restart'){
        let optionToRender = this.chatOptionHandler(userAnswer)
        // this.setState({optionToRender: optionToRender})
        console.log("sanity check", optionToRender)
        // set state here!
        let addToChatContent = this.updateChatContent(optionToRender) // this is a new chosen line to add

        this.setState({
          optionToRender: optionToRender,
          chatContent: [...this.state.chatContent, addToChatContent]
        })

      } else { // otherwise render seq
        let seqToRender = this.resHandler(userAnswer)
        this.setState({renderSeq: seqToRender})
      }
      // empty the input field
      this.setState({userInput: ''})
    }
  }

  chatOptionHandler = (res) => {
    let choice = ''
    switch (res) {
      case 'give me a shout.':
        choice = "a";
        // also need to add this to the chatContent?
        break;
      case 'what?':
        choice = "b";
        break;
      case 'but why?':
        choice = "c";
        break;
      case 'tell me.':
        choice = "d";
        break;
      default:
        choice = null;
    }
    return choice
  }

  // input: option from the user
  // output: random line from the data object
  updateChatContent = (opt) => {
    console.log("hello????testDataStorage", testDataStorage)
    try {
      console.log("????????????? testDataStorage[0][opt]",testDataStorage["Sung"][opt])
      let selectedLine;
      if (optionCount[opt] <= testDataStorage["Sung"][opt].length - 1){
        selectedLine = testDataStorage["Sung"][opt][optionCount[opt]]
        optionCount[opt] += 1
      } else {
        optionCount[opt] = 0
        selectedLine = testDataStorage["Sung"][opt][optionCount[opt]]
      }
      return selectedLine;
    }
    catch(error) {
      console.error(error);
      return 'line blackhole'
    }
  }

  resHandler = (res) => {
    let currSeq = this.state.currSeq
    let nextSeq = this.state[currSeq][res]

    // valid next sequence was found
    if (nextSeq){
      this.setState({
        prevSeq: currSeq,
        currSeq: nextSeq,
        renderSeq: nextSeq
      })
      return nextSeq

    } else { // invalid, there is no nextseq according to the input
      // if the currea is 'invalid', render backontrackseq
      if (currSeq === 'Invalid'){
        return 'Invalid'
      } else { // if the currseq is not 'invalid', render Invalid
        this.setState({
          backontrackseq: currSeq,
          Invalid: {
            start: 'Landing',
            back: currSeq,
          },
          prevSeq: currSeq,
          currSeq: 'Invalid',
          renderSeq: 'Invalid'
        })
        return 'Invalid'
      }
    }
  }

  handleFile = (file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
          const file = event.target.result;
          const allLines = file.split(/\r\n|\n/);
          // Reading line by line
          allLines.forEach((line) => {
              // IMLEMENT
              // from text, get patterns and write it in a json format
              console.log(line);
          });
      };
      reader.onerror = (event) => {
          alert(event.target.error.name);
      };
      reader.readAsText(file);
  }

  testDataStorageHandler = () => {

    testRawData.forEach(function(element){

      let userName = getUser(element)
      let resultA = getPatternA(element)
      let resultB = getPatternB(element)
      let resultC = getPatternC(element)
      let resultD = getPatternD(element)

      if (testDataStorage[userName]){
        if ( resultA !== null ){
          console.log("WHAT", testDataStorage[userName])
          console.log("WHAT", testDataStorage)
          testDataStorage[userName].a.push(...resultA)
        }
        if ( resultB !== null ){
          testDataStorage[userName].a.push(...resultB)
        }
        if ( resultC !== null ){
          testDataStorage[userName].a.push(...resultC)
        }
        if ( resultD !== null ){
          testDataStorage[userName].a.push(...resultD)
        }
      } else {
        testDataStorage[userName] = {
          a: [],
          b: [],
          c: [],
          d: [],
        }
        if ( resultA !== null ){
          testDataStorage[userName].a.push(...resultA)
        }
        if ( resultB !== null ){
          testDataStorage[userName].a.push(...resultB)
        }
        if ( resultC !== null ){
          testDataStorage[userName].a.push(...resultC)
        }
        if ( resultD !== null ){
          testDataStorage[userName].a.push(...resultD)
        }
      }
    });

    console.log("this is the stored data", testDataStorage)
  }

  testLinePatternExtractor = (line) => {

  }

  fileReader = (event) => {

    var file = event.target.files[0];


    const handleFile = (file) => {
          const reader = new FileReader();
          reader.onload = function () {
            const file = event.target.result;
            const allLines = file.split(/\r\n|\n/);
            // Reading line by line
            allLines.forEach((line) => {
                console.log(line);
            });
          }.bind(this);
          // reader.onload = (event) => {
          //     const file = event.target.result;
          //     const allLines = file.split(/\r\n|\n/);
          //     // Reading line by line
          //     allLines.forEach((line) => {
          //         console.log(line);
          //     });
          // }
          // reader.onerror = (event) => {
          //     alert(event.target.error.name);
          // }
          reader.readAsText(file);
      }

  }

  myCallback = (dataFromChild) => {
      console.log("[myCallback] inside")
      console.log("data from child delivered", dataFromChild)
  }


  render() {
    console.log("[APP] this.state.currSeq:",this.state.currSeq)
    let optionToRender = this.state.optionToRender
    console.log("[APP] optionToRender", optionToRender)
    let chatContentAll = this.state.chatContent
    // render line by line
    let chatLineComp = chatContentAll.map((line, i) => {
      return <ChatLine key={i} lineContent = {line}/>
    })

    return (
      <div className="App">
        <Layout>
          {this.state.currSeq === 'Upload'?
          <Terminal sequence={this.state.renderSeq}>

            <FileReader callbackFromParent={this.myCallback} />

            <div className="text-data-div">
              <input type="text" onChange={this.testDataStorageHandler} />
            </div>

            <Prompt userInput = {this.state.userInput}/>
            <input
              type="text"
              onChange={this.inputChangedHandler}
              onKeyPress={this.keyPressedHandler}
              value={this.state.userInput} />
          </Terminal>
          :
          <Terminal sequence={this.state.renderSeq}>
            <Prompt userInput = {this.state.userInput}/>
            <input
              type="text"
              onChange={this.inputChangedHandler}
              onKeyPress={this.keyPressedHandler}
              value={this.state.userInput} />
          </Terminal>
        }

          <Chat
            choice={this.state.userAnswer}
            optionToRender={this.state.optionToRender}
            content={this.state.chatContent}>
            {chatLineComp}
          </Chat>

        </Layout>
      </div>
    );
  }
}

export default App;
