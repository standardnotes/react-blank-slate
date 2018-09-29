import React from 'react';
import BridgeManager from '../lib/BridgeManager';

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};

    BridgeManager.get().addUpdateObserver(() => {
      this.setState({note: BridgeManager.get().getNote()});
    })
  }

  render() {
    return (
      <div>
        <p>Component is ready.</p>

        {this.state.note &&
          <div>
            <p>
              Working note title: <strong>{this.state.note.content.title}</strong>
            </p>
            <p>
              Working note content: <strong>{this.state.note.content.text}</strong>
            </p>
          </div>
        }
      </div>
    )
  }

}
