import React from 'react';
import Sequence from '../components/Sequence'

const Terminal = (props) => {
  return (
    <div className ="terminal-container container">
      <Sequence
        sequence={props.sequence}
        chatUsers={props.chatUsers}/>
      {props.children}
    </div>
  );
}

export default Terminal;
