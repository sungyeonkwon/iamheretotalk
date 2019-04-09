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
  l: 0,
}

let inputChatLine = {
  a: 'What?',
  b: 'Give me a shout.',
  c: 'But why?',
  d: 'Tell me what you need to say.',
  e: 'What do you think?',
  f: 'What do you want?',
  g: 'How do you feel?',
  h: 'How do you *really* feel?',
  i: 'Ask me a question.',
  j: 'What is important on the internet?',
  k: 'What does it mean?',
  l: 'What do you love?',
  m: 'What do you think of me?'
}

let finishedData = {
  John: {
    a: ["I think you look more like your dad!", "I told you but you won't listen!"],
    b: ["STARS ARE WAITING FOR YOU", "COME HERE RIGHT NOW"],
    c: ["Because I observe you!", "Because they shovel snow and it is a lot harder than they remembered."],
    d: ["I am realising having an intern does not necessarily reduce my workload because I have to explain everything and even then I have to re-work on it, it’s double the amount of work", "My housemate just said that her need to have hot water to wash her hair at 5am is more important than my need to not get woken up in the middle of the night."],
    e: ["I think we must use more pesticides", "I think I'm under constant stress now.", "I think that kind of society could totally stifle growth."],
    f: ["I want some shock in the system", "I want schnitzel", "I want emotional support"],
    g: ["I feel validated now.", "I feel like I'm wasting my time"],
    h: ["😈", "💩"],
    i: ["Did you clarify your break up?", "Did you actually dance to the song?", "Like rose water in the icing?", "What’s the plan for tomorrow?", "What else did you tell me about her?"],
    j: ["https://www.bbc.co.uk/news/av/uk-england-leeds-447…row-with-yorkshire-accent-filmed-in-knaresborough"],
    k: ["It means you’re having a good time.", "It means you have seen my message but are avoiding looking at it."],
    l: ["I love the first one", "I love your voice"],
    m: ["You are joking me.", "You are having a good eve"],
  },
  Sara: {
    a: ["This is better than yesterday!", "Because we came from _hell_ and now we are in a good place!"],
    b: ["FUNNY. HA. HA. HA.", "I HAVE FORGOTTEN"],
    c: ["Because she wanted it but she just has too much self respect.", "Because we came from _hell_ and now we are in a good place!"],
    d: ["There were so many more exciting questions to be asked, but you have shown yourself to not be ready", "I feel much much better today, feeling actually okay and realised how great it is to feel okay in comparison to feeling not okay"],
    e: ["I think that kind of society could totally stifle growth."],
    f: ["I want to know if I am being too harsh or nasty in here", "I want to be dependable!"],
    g: ["I feel so tired it’s like having a brain injury.", "I feel a bit sorry for her because she wanted it but she just has too much self respect."],
    h: ["😞", "⭐"],
    i: ["Shall I send them this photo?", "Where are you going?"],
    j: ["https://www.reddit.com/r/aww/comments/82xokn/this_isnt_a_joke_seriously_buy_me"],
    k: ["It means very simple organism, like single cellular organisms"],
    l: ["I love this it's like dreaming", "I love you."],
    m: ["YOU ARE A GENIUS", "You are not going to", "You are disciplined"],
  },
}

class App extends Component {

  // regulates the sequence, userinput
  state = {
      demo: false,
      userInput: '',
      userAnswer: '',
      prevSeq: 'Landing',
      currSeq: 'Landing',
      nextSeq: '',
      backontrackSeq: 'Landing',
      Landing: {
        a: 'Info',
        b: 'Upload',
        c: 'Person',
      },
      Info: {
        a: 'Upload',
      },
      Upload: {
        a: 'Person',
      },
      Person: {
      },
      Talk: {
        x: 'Person',
        y: 'Upload',
        z: 'Landing',
      },
      Invalid: {
        start: 'Landing',
      },
      renderSeq: 'Landing',
      chatContent: [
        'I\'m here to talk.',
      ],
      chatUsers:{},
      chatUserColors: {},
      chatUserHistory: {},
      chosenUser: '',
      optionToRender: null,
      fileStatus: null,
      fileUploaded: false,
      collGarbage: false,
      youCanType: false,
      hidden: 'hidden',
      readyForYourResponse: false,
      zoneText: "Drop File Here",
      zoneUploaded: "",
  };

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("[componentDidUpdate]")

    if (prevState.readyForYourResponse !== this.state.readyForYourResponse) {
      console.log("prevState.readyForYourResponse", prevState.readyForYourResponse)
      console.log("this.state.readyForYourResponse", this.state.readyForYourResponse)
      let userAnswer = this.state.userAnswer

      if (this.state.readyForYourResponse){// if this is true
          console.log("this means I'm really ready for your response")
          this.insertChatResponse(userAnswer)
      }

    } else {
      console.log("componentDidUpdate, not applicable")
    }
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    $(".chat-container").animate({ scrollTop: $(".chat-container")[0].scrollHeight }, 1000);
  }

  inputChangedHandler = (event) => {
    this.setState({userInput: event.target.value})
  }

  insertUserChatOption = (userAnswer) => {
    this.setState({
      chatContent: [...this.state.chatContent, inputChatLine[userAnswer]],
    })

    setTimeout(function(){
      this.setReadyForYourResponse()
    }.bind(this), 1700)

  }

  insertChatResponse = (userAnswer) => {
    let chatLength = this.state.chatContent.length
    let addToChatContent = this.updateChatContent(userAnswer, this.state.chosenUser)
    this.setState({
      readyForYourResponse: false,
      optionToRender: userAnswer,
      chatContent: [...this.state.chatContent, addToChatContent],
      chatUserHistory: Object.assign(this.state.chatUserHistory, {
        [chatLength]: this.state.chosenUser,
      })
    })
  }

  keyPressedHandler = (event) => {
    this.setState({hidden: 'hidden'})
    let key = event.keyCode || event.which;
    if (key === 13){
      let userAnswer = event.target.value.toLowerCase();

      this.setState({userAnswer:userAnswer})

      if (this.state.currSeq === 'Landing' && userAnswer == 'c'){
        this.setState({demo:true})
        this.callbackFileHandler(finishedData, ['Sara', 'John'])
        let seqToRender = this.resHandler(userAnswer)
        this.setState({renderSeq: seqToRender})

      } else if (this.state.currSeq === 'Person'){
        let chosenUser = this.state.chatUsers[userAnswer]
        let seqToRender = this.resHandler(userAnswer)
        this.setState({
          chosenUser: chosenUser,
          renderSeq: seqToRender,
          fileStatus: null,
          fileUploaded: false,
        })

      } else if (this.state.currSeq === 'Talk' && userAnswer !== 'x' && userAnswer !== 'y' && userAnswer !== 'z'){
        this.insertUserChatOption(userAnswer);
      } else if (this.state.currSeq === 'Talk' && userAnswer === 'z') { // clear chat, reset
        finishedData = {}
        this.setState({
          chatContent: ['I\'m here to talk again.',],
          renderSeq: "Landing",
          currSeq: "Landing",
          fileStatus: null,
          fileUploaded: false,
          zoneText: "Drop File Here",
          zoneUploaded: "",
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
    try {
      let selectedLine;
      if (finishedData[user][opt].length === 0) {
        selectedLine = "I don't know what to say."
      } else if (optionCount[opt] <= finishedData[user][opt].length - 1){
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
          backontrackSeq: currSeq,
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


      let PersonObj = Object.keys(userObj).map((key, i) => {
        return ({ [key]: 'Talk' })
      });

      // merge objects for chat users
      PersonObj = PersonObj.reduce(function(acc, x) {
          for (var key in x) {
            if (x[key]){
              acc[key] = x[key];
            }
          }
          return acc;
      }, {});

      this.setState({
        chatUsers: userObj,
        Person: PersonObj,
      // }, () => {this.createUserColors()
      })

      finishedData = dataFromChild
      console.log("finishedData >>> ", finishedData)
      this.setState({collGarbage: true});
  }

  callbackFileLoading = () => {
    this.setState({fileStatus: "Uploading the file, please wait..."})
  }

  callbackFileLoaded = (result) => {
    if (result === "File seems to be odd."){
      this.setState({
        fileStatus: result,
        fileUploaded: true,
        zoneText:'Drop a Valid File',
        zoneUploaded: ''
      })
    } else {
      this.setState({
        fileStatus: result,
        fileUploaded: true,
        zoneText:'File Successfully Uploaded',
        zoneUploaded: 'upload'
      })
    }
  }

  setReadyForYourResponse = () => {
    this.setState({readyForYourResponse: true})
  }

  // createUserColors = () => {
  //   // retrive all users and assign colors to it
  //   let users = Object.values(this.state.chatUsers)
  //   let colors = ['rgba(240,20,15,0.4)', 'rgba(50,40,205,0.3)', 'rgba(160,20,175,0.4)', 'rgba(20,220,45,0.4)', 'rgba(140,120,15,0.4)', 'rgba(10,250,65,0.4)', 'rgba(173,255,47,0.6)']
  //   let chatUserColors = {}
  //   if (users.length !== 0) {
  //     users.map((user, i) => {
  //       chatUserColors[user] = colors[i]
  //     })
  //   }
  //   this.setState({chatUserColors: chatUserColors}, () => console.log(this.state.chatUserColors))
  // }

  render() {
    console.log("[APP] this.state.currSeq:", this.state.currSeq)

    // user name config
    let chatContentAll = this.state.chatContent
    let user;
    if (this.state.chosenUser){
      user = this.state.chosenUser
    } else {
      user = 'Hello.'
    }

    let chatLineComp = chatContentAll.map((line, i) => {
      console.log("[chatLineComp] chatUserHistory", this.state.chatUserHistory)
      if (this.state.chatUserHistory[i]) {
        user = this.state.chatUserHistory[i]
      }
      // let userColor = {
      //   backgroundColor: this.state.chatUserColors[this.state.chosenUser],
      // };

      // initial hello
      if ( i === 0 ){
        return (
          <div className="chatLine you" key={i}>
            <Typing speed={10} className="chat-text-container you">
              <span className="chat-text you" >{user}<br/>{line}</span>
            </Typing>
          </div>)
      }

      // you
      else if (i % 2 === 0 && line !== undefined) {
        return (
          <div className="chatLine you" key={i} wait={1000}>
            <span className="username">{user}</span><br/>
            <Typing speed={10} className="chat-text-container you">
              <Typing.Delay ms={1000} />
              <span className="chat-text you">{line}</span>
            </Typing>
          </div>)
      }
       // me
      else {
        return (
          <div className="chatLine me" key={i}>
            <Typing speed={10} className="chat-text-container me">
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
              uploaded={this.state.fileUploaded}
              collGarbage={this.state.collGarbage}
              zoneTextChange={this.state.zoneText}
              zoneUploaded={this.state.zoneUploaded}
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
            <a className="twitter-share-button"
               href="https://twitter.com/intent/tweet?text=I%20talked%20to%20you:%20http://iamheretotalk.online"
               target="_blank">
              Tweet this thing</a>
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
              value={this.state.userInput}
              autoFocus="autofocus" />
            <a className="twitter-share-button"
               href="https://twitter.com/intent/tweet?text=I%20talked%20to%20you:%20http://iamheretotalk.online"
               target="_blank">
              Tweet this thing</a>
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
