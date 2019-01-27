import React from 'react';

const sequence = ( props ) => {
  let sequenceToRender = props.sequence;
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
      Drag and drop your chat file named '_chat.txt' in the area below:<br/>
        <div className="drag-drop">
        ╭─────────────────────────╮<br/>
        │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>
        │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Drag and drop your file here&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>
        │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>
        ╰─────────────────────────╯<br/>
        </div><br/>
      When you're done, type 'done'.
      </div>
    )
  } else if (sequenceToRender === "Person") {
    return (
      <div className="sequence">
      Select who you want to talk to in this chat:<br/>
      (a) Sung<br/>
      (b) Joung
      </div>
    )
  } else if (sequenceToRender === "Ready") {
    return(
      <div className="sequence">
      Please wait while we prepare the talk to happen...
      Done. Ready to talk to Sung.<br/>
      (a) Talk to Sung<br/>
      (b) Talk to someone else
      </div>
    )
  } else if (sequenceToRender === "Talk") {
    return(
      <div className="sequence">
      Chat initialised<br/>
      (Give me a shout.)<br/>
      (What?)<br/>
      (But why?)<br/>
      (Tell me.)<br/><br/>
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
