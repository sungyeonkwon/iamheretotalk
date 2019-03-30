import React, { Component } from 'react';
import Aux from '../hoc/Aux';

class Chat extends Component {
  // state needs to handle and loop through the option lines
  state = {
    chatAnswer: '',
  }

  render () {
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
