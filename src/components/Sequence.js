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
              <span>({abcd[index]}) </span>{user}<br/>
          </span> );
      } );
  } catch {
    userOptions = ''
  }

  if (sequenceToRender === "Landing") {
    return (
      <div className="sequence">
      Select an option by typing in the letter inside the brackets:<br/>
      <span className="divider">––––––––––––––––––––––––––––––––––––––––––</span><br/>
      (a) What is this?<br/>
      (b) I know what this is, let me proceed.<br/>
      (c) Just show me a demo already!
      </div>
    )
  } else if (sequenceToRender=== "Info") {
    return (
      <div className="sequence">
      You are going to talk to people you have previously talked on WhatsApp (or to yourself) again. To do this: <br/>
      <span className="divider">––––––––––––––––––––––––––––––––––––––––––</span><br/>
      1. Export a WhatsApp conversation from your device. You must select an option 'without media' for this to work. <br/>
      <span className="divider">––––––––––––––––––––––––––––––––––––––––––</span><br/>
      2. Then, you will simply upload the '.txt' file for the next step.<br/>
      <span className="divider">––––––––––––––––––––––––––––––––––––––––––</span><br/>
      * This app does not store your data – in fact, it doesn't have a database. If you feel incredulous, you can check the codebase <a href="https://github.com/sungyeonkwon/iamheretotalk" target="_blank">here</a>. Enough said; now, initiate a chat.<br/>
      <span className="divider">––––––––––––––––––––––––––––––––––––––––––</span><br/>
      (a) Okay, I'm ready to upload the chat file.
      </div>
    )
  } else if (sequenceToRender === "Invalid") {
    return (
      <div className="sequence">
      Please behave. You're typing in gibberish. <br/>
      When you're ready to comply, type in:<br/>
      <span className="divider">––––––––––––––––––––––––––––––––––––––––––</span><br/>
      (back) to go back where you were <br/>
      (start) to go back to the beginning
      </div>
    )
  } else if (sequenceToRender === "Upload"){
    return (
      <div className="sequence">
      Upload your chat file named '_chat.txt' in the area below:<br/>
      <span className="divider">––––––––––––––––––––––––––––––––––––––––––</span><br/>

      </div>
    )
  } else if (sequenceToRender === "Person") {
    return (
      <div className="sequence">
      Select who you want to talk to:<br/>
      <span className="divider">––––––––––––––––––––––––––––––––––––––––––</span><br/>
      {userOptions}
      </div>
    )
  } else if (sequenceToRender === "Talk") {
    return(
      <div className="sequence">
      Ready to talk. What do you want to say?<br/>
      <span className="divider">––––––––––––––––––––––––––––––––––––––––––</span><br/>
      (a) What?<br/>
      (b) Give me a shout.<br/>
      (c) But why?<br/>
      (d) Tell me what you need to say.<br/>
      (e) What do you think?<br/>
      (f) What do you want?<br/>
      (g) How do you feel?<br/>
      (h) How do you *really* feel?<br/>
      (i) Ask me a question.<br/>
      (j) What is important on the internet?<br/>
      (k) What does it mean? <br />
      (l) What do you love? <br/>
      (m) What do you think of me? <br/>
      <span className="divider">––––––––––––––––––––––––––––––––––––––––––</span><br/>
      If you are done with this conversation, <br/>you can:<br/>
      <span className="divider">––––––––––––––––––––––––––––––––––––––––––</span><br/>
      (x) Talk to another person.<br/>
      (y) Upload and initiate another chat.<br/>
      (z) Clear this conversation and go back to the beginning.
      </div>
    )
  } else {
    return (
      <div className="sequence">
      Haha! You fell into the blackhole.
      </div>
    )
  }
};

export default sequence;
