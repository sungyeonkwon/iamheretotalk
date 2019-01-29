import React, { Component } from 'react';
// import Aux from '../../hoc/Aux';

import Sequence from '../components/Sequence'
import Aux from '../hoc/Aux';

class Terminal extends Component {
    state = {
    }

    render () {
        return (
          <Aux>
            <div className ="terminal-container container">
              <Sequence
                sequence={this.props.sequence}
                chatUsers={this.props.chatUsers}/>
              {this.props.children}
            </div>
          </Aux>
        );
    }
}

export default Terminal;
