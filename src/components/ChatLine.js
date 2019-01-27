import React from 'react';

const chatLine = ( props ) => {

    return (
        <div className="chatLine">
            {props.lineContent}
        </div>
    );
};

export default chatLine;
