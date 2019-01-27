import React from 'react';

const prompt = ( props ) => {
    return (
        <div className="prompt">
            $: {props.userInput}
        </div>
    );
};

export default prompt;
