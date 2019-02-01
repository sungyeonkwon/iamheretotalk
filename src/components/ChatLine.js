import React from 'react';

import Typing from 'react-typing-animation';



const chatLine = ( props ) => {
  // return (
  //     <div className="chatLine">
  //       <span className="chat-text">{props.lineContent}</span>
  //     </div>
  // );

    return (
        <div className="chatLine">
        <Typing speed={3}>
          <span className="chat-text">{props.lineContent}</span>
        </Typing>
        </div>
    );
};

export default chatLine;
