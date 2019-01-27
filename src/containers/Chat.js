import React, { Component } from 'react';
// import ChatLine from '../components/ChatLine'
// import FakeData from '../components/FakeData';
import Aux from '../hoc/Aux';


class Chat extends Component {
  // state needs to handle and loop through the option lines
  state = {
    // chatChoice:
    chatAnswer: '',
  }


  render () {

    // let optionToRender = this.props.optionToRender
    // let selectedLine;
    // if (optionToRender) {
    //   console.log("there is an option to render!!!!")
    //   // need to render the option from the object
    //   selectedLine = FakeData.response[optionToRender][1] // number needs to be randomly chosen
    //
    //   this.updateChatContent(optionToRender);
    //
    //   if (!selectedLine){
    //     selectedLine = 'blackhole'
    //   }
    // }
    //
    // let chatContentAll = this.props.content
    //
    // // console.log("FakeData", FakeData.user)
    // // this.setState((state, props) => ({
    // //   chatContent: state.chatContent.concat(props.choice)
    // // }));
    //
    // // render line by line
    // let chatLineComp= chatContentAll.map((line, i) => {
    //   return <ChatLine key={i} lineContent = {line}/>
    // })

    return (
      <Aux>
        <div className="chat-container container">
            {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Chat;
