import React from 'react';

const Chat = (props) => {
  return (
    <div className="chat-container container">
        {props.children}
    </div>
  ); 
}

export default Chat;
