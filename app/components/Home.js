import React from 'react';
import BridgeManager from '../lib/BridgeManager';

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};

    BridgeManager.get().addUpdateObserver(() => {
      this.setState({note: BridgeManager.get().getNote()});
      this.analyzeNote();
    })
  }

  analyzeNote() {
    // Count any word characters or ellipses:
    // https://regex101.com/r/hJ61ft/1
    let wordCount = this.state.note.content.text.match(/([\w'‘’\-]|(\.{3}))+/gm).length;
    this.setState({wordCount: wordCount});
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

            <p>Number of words: <strong>{this.state.wordCount}</strong></p>
          </div>
        }
      </div>
    )
  }

}
