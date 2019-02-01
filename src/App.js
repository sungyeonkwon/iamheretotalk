import React, { Component } from 'react';
import './App.css';

import Layout from './components/Layout';
import Terminal from './containers/Terminal';
import Prompt from './components/Prompt'
import Chat from './containers/Chat';
import FileReader from './components/FileReader'

import Typing from 'react-typing-animation';
import $ from 'jquery';

let optionCount = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  e: 0,
  f: 0,
  g: 0,
  h: 0,
  i: 0,
  j: 0,
  k: 0,
}

let inputChatLine = {
  a: 'Give me a shout.',
  b: 'What?',
  c: 'But why?',
  d: 'Tell me a story.',
  e: 'What do you think?',
  f: 'What do you want?',
  g: 'How do you feel?',
  h: 'Ask me questions.',
  i: 'What is important on the internet?',
  j: 'What does it mean',
  k: 'What do you love',
}

let finishedData;

class App extends Component {

  // constructor(props) {
  //   super(props);
  //   this.myRef = React.createRef();
  // }

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
        a: 'Talk', b: 'Talk', c: 'Talk', d: 'Talk', e: 'Talk', f: 'Talk', g: 'Talk', h: 'Talk', i: 'Talk',
      },
      Talk: {
        x: 'Person',
        y: 'Upload',
        z: 'Landing',
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

  componentWillMount() {
    console.log("componentWillMount")
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    console.log("componentWillUnmount")
  }

  scrollToBottom = () => {
    $(".chat-container").animate({ scrollTop: $(".chat-container")[0].scrollHeight }, 1000);
    $(".chat-background").css('filter', 'blur(20px)');

  }

  inputChangedHandler = (event) => {
    this.setState({userInput: event.target.value})
  }

  insertUserChatOption = (userAnswer) => {
    this.setState({ chatContent: [...this.state.chatContent, inputChatLine[userAnswer]] }, () => {
      this.insertChatResponse(userAnswer);
    });
  }

  insertChatResponse = (userAnswer) => {
    let addToChatContent = this.updateChatContent(userAnswer, this.state.chosenUser)
    this.setState({
      optionToRender: userAnswer,
      chatContent: [...this.state.chatContent, addToChatContent]
    })
  }

  keyPressedHandler = (event) => {
    let key = event.keyCode || event.which;

    if (key === 13){
      let userAnswer = event.target.value.toLowerCase();
      this.setState({userAnswer:userAnswer})

      // if currseq is chat, get optiontorender
      if (this.state.currSeq === 'Person'){

        let chosenUser = this.state.chatUsers[userAnswer]
        let seqToRender = this.resHandler(userAnswer)
        this.setState({
          chosenUser: chosenUser,
          renderSeq: seqToRender,
          fileStatus: null,
        })

      } else if (this.state.currSeq === 'Talk' && userAnswer !== 'x' && userAnswer !== 'y' && userAnswer !== 'z'){

        this.insertUserChatOption(userAnswer);
        // this.insertChatResponse(userAnswer);

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
    try {
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
      return 'You did not talk in the right way to me.'
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
    console.log("THIS NEEDS TO BE FIRED ONLY ONCE")
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
    this.setState({fileStatus: "Loading the file, please wait..."})
  }

  callbackFileLoaded = () => {
    this.setState({fileStatus: "File successfully uploaded. Type in 'done' to proceed."})
  }

  render() {
    console.log("[APP] this.state.currSeq:",this.state.currSeq)
    let chatContentAll = this.state.chatContent
    let chatLineComp = chatContentAll.map((line, i) => {
      if (i % 2 === 0){
        return (
          <div className="chatLine" key={i}>
            <Typing speed={3} className="chat-text-container you">
              <Typing.Delay ms={1500} />
              <span className="chat-text you">{this.state.chosenUser}:<br/> {line}</span>
            </Typing>
          </div>)
      } else {
        return (
          <div className="chatLine" key={i}>
            <Typing speed={3} className="chat-text-container me">
              <span className="chat-text me">{line}</span>
            </Typing>
          </div>)
      }
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
            {this.state.fileStatus === null?
            <div></div>:
            <div>{this.state.fileStatus}<br/></div>}
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
          <div className="chat-background"></div>
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
