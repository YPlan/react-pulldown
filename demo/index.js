import React from 'react';
import ReactDOM from 'react-dom';
import {PulldownClose, PulldownGoto, PulldownStage, Pulldown} from '../dist';

const App = React.createClass({

  render() {
    return (
      <Pulldown
        className="demo"
        defaultStage="a"
        delay={1000}
      >

        <PulldownStage
          height={100}
          name="a"
          position="top"
        >
          I'm the first stage
          <PulldownGoto
            stage="b"
          >
            Next
          </PulldownGoto>
        </PulldownStage>

        <PulldownStage
          className="stage-b"
          height={200}
          name="b"
          position="top"
        >
          I'm the second stage
          <PulldownClose>
            Close
          </PulldownClose>
        </PulldownStage>

      </Pulldown>
    );
  },

});

ReactDOM.render(<App />, document.getElementById('app'));
