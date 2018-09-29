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
    var s = this.state.note.content.text;
    s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
    s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
    s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
    let wordCount = s.split(' ').length;
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
