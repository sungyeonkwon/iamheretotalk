import React, { Component } from 'react';
import './App.css';

import Layout from './components/Layout';
import Terminal from './containers/Terminal';
import Prompt from './components/Prompt'
import ChatLine from './components/ChatLine'
import Chat from './containers/Chat';

import FileReader from './components/FileReader'


let optionCount = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  e: 0,
  f: 0,
  g: 0,
  h: 0,
}

let finishedData;


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
        a: 'Talk', b: 'Talk', c: 'Talk', d: 'Talk', e: 'Talk', f: 'Talk', g: 'Talk', h: 'Talk',
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
      ],
      chatUsers:{},
      chosenUser: '',
      optionToRender: null,
      fileStatus: null,
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
      if (this.state.currSeq === 'Person'){
        //// error setting is not useranswer, need to store not the 'abcd' but the user
        let chosenUser = this.state.chatUsers[userAnswer]
        this.setState({chosenUser: chosenUser})

        let seqToRender = this.resHandler(userAnswer)
        this.setState({renderSeq: seqToRender})
      } else if (this.state.currSeq === 'Talk' && userAnswer !== 'restart'){
        let optionToRender = userAnswer
        let addToChatContent = this.updateChatContent(optionToRender, this.state.chosenUser) // this is a new chosen line to add

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

  // input: option from the user
  // output: random line from the data object
  updateChatContent = (opt, user) => {
    console.log("[updateChatContent]", finishedData)
    console.log("[updateChatContent]]", user)

    try {
      console.log("?????????????", finishedData[user][opt])
      let selectedLine;
      if (optionCount[opt] <= finishedData[user][opt].length - 1){
        selectedLine = finishedData[user][opt][optionCount[opt]]
        optionCount[opt] += 1
      } else {
        optionCount[opt] = 0
        selectedLine = finishedData[user][opt][optionCount[opt]]
      }
      return selectedLine;
    }
    catch(error) {
      console.error(error);
      return 'You did not talk in a right way to me.'
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

  callbackFileHandler = (dataFromChild, users) => {
      console.log("[callbackFileHandler] inside")
      console.log("data from child delivered", dataFromChild)
      console.log("[app.js callbackFileHandler]users", users)
      users = users.sort()
      let abcd = 'abcdefghijklmnopqrstuvwxyz'.split('')
      // set the person as per the user data
      let userObj = abcd.map((letter, i) => {
        return ({ [letter]: users[i] })
      });

      // merge objects for chat users
      userObj = userObj.reduce(function(acc, x) {
          for (var key in x) {
            if (x[key]){
              acc[key] = x[key];
            }
          }
          return acc;
      }, {});

      this.setState({
        chatUsers: userObj,
      })
      finishedData = dataFromChild
  }

  callbackFileLoading = () => {
    this.setState({fileStatus: "Loading the file..."})
    // alert("loading...")
  }

  callbackFileLoaded = () => {
    this.setState({fileStatus: "File successfully uploaded."})
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
          <Terminal
            sequence={this.state.renderSeq}
            chatUsers={this.state.chatUsers}>
            <FileReader
              callbackFromParent={this.callbackFileHandler}
              callbackFileLoading={this.callbackFileLoading}
              callbackFileLoaded={this.callbackFileLoaded}
              />
          {this.state.fileStatus === null? <div></div>:
            <div>
            {this.state.fileStatus}<br/>
            Please type in 'done' to proceed.
            </div>}

            <Prompt userInput = {this.state.userInput}/>
            <input
              type="text"
              onChange={this.inputChangedHandler}
              onKeyPress={this.keyPressedHandler}
              value={this.state.userInput} />
          </Terminal>
          :
          <Terminal
              sequence={this.state.renderSeq}
              chatUsers={this.state.chatUsers}>
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
