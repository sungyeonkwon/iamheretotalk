import React from 'react';

const sequence = ( props ) => {

  let sequenceToRender = props.sequence;
  let users = props.chatUsers;
  let abcd = 'abcdefghijklmnopqrstuvwxyz'.split('')
  let userOptions = ''

  try {
    userOptions = Object.values(users).sort()
        .map( (user, index) => {
            return (
                <span key={index}>
                    <span style={{ color:'pink' }}>({abcd[index]}) </span>{user}<br/>
                </span> );
        } );
  } catch {
    userOptions = ''
  }

  if (sequenceToRender === "Landing") {
    return (
      // here sequence is the variable that's different
      <div className="sequence">
      Please select:<br/>
      (a) Show me what this is about<br/>
      (b) I'm ready to upload my chat<br/>
      </div>
    )
  } else if (sequenceToRender=== "Info") {
    return (
      <div className="sequence">
      This is a long winding paragraphs:<br/>
      (a) I'm ready to upload my chat
      </div>
    )
  } else if (sequenceToRender === "Invalid") {
    return (
      <div className="sequence">
      Please behave. You're typing in gibberish. When you're ready to comply, type in:<br/>
      (back) to go back where you were <br/>
      (start) to go back to the beginning <br/>
      </div>
    )
  } else if (sequenceToRender === "Upload"){
    return (
      <div className="sequence">
      Please export your whatsapp chat without media.
      Your date format should be something like this, otherwise it means you're using American English and that's nice but farewell.<br/><br/>
      Upload your chat file named '_chat.txt' in the area below:<br/>
      </div>
    )
  } else if (sequenceToRender === "Person") {
    return (
      <div className="sequence">
      Select who you want to talk to in this chat:<br/>
      {userOptions}
      </div>
    )
  } else if (sequenceToRender === "Talk") {
    return(
      <div className="sequence">
      Chat initialised<br/>
      (a) Give me a shout.<br/>
      (b) What?<br/>
      (c) But why?<br/>
      (d) Tell me a story.<br/>
      (e) What do you think?<br/>
      (f) What do you want?<br/>
      (g) How do you feel?<br/>
      (h) Ask me questions.<br/><br/>
      (restart)
      </div>
    )
  } else {
    return (
      <div className="sequence">
      You fell into the blackhole.
      </div>
    )
  }
};

export default sequence;
